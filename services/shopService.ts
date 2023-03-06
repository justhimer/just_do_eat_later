import type {Knex} from 'knex'
import { TransactionDetails } from '../util/interfaces';

export class ShopService {

    constructor(private knex:Knex){}

    async getAllFood(): Promise<any>{
        let allFood = (await this.knex.raw(`
        select food_details.id as id, foods.id as food_id, foods."name" as name , food_details.portion as portion, food_details.calories as calories, foods.food_type_id as type_id, food_types."name" as "type", foods.image as image, foods.description as description, foods.ingredients as ingredients, foods.preparation as preparation, foods.allergens as allergens
        from food_details
        inner join foods
        on food_details.food_id = foods.id 
        inner join food_types
        on food_types.id = foods.food_type_id 
        `)).rows

        return allFood
    }

    async getDistinctTypes(): Promise<any>{
        let allTypes = await this.knex
        .distinct()
        .from('food_types')
        .pluck('name')

        return allTypes
    }

    async createItem(id:number,food_id:number,quantity:number){
        await this.knex
        .insert({
            user_id: id,
            food_detail_id: food_id,
            quantity: quantity
        })
        .into('shopping_cart')
    }

    async addItem(id:number,food_id:number,quantity:number){
        await this.knex('shopping_cart')
        .where({
            user_id: id,
            food_detail_id: food_id
        })
        .increment("quantity",quantity)
    }

    async deleteUnit(id:number,food_id:number,quantity:number){
        await this.knex('shopping_cart')
        .where({
            user_id: id,
            food_detail_id: food_id
        })
        .decrement("quantity",quantity)
    }

    async deleteItem(id:number,food_id:number){
        await this.knex('shopping_cart')
        .where({
            user_id: id,
            food_detail_id: food_id
        })
        .del()
    }

    async deleteAll(id:number){
        await this.knex('shopping_cart')
        .where("user_id",id)
        .del()
    }

    async getItemCount(id:number,food_id:number): Promise<any>{
        let itemCount = 0
        let knexPull = await this.knex('shopping_cart')
        .select('quantity')
        .where({
            "user_id":id,
            "food_detail_id":food_id
        })
        .first()
        if (knexPull != undefined){
            itemCount = knexPull.quantity
        }

        return itemCount
    }

    async getTotalCount(id:number): Promise<any>{
        let totalCount = await this.knex('shopping_cart')
        .sum("quantity")
        .where("user_id",id)
        .first()

        return totalCount
    }

    async getAll(id:number): Promise<TransactionDetails[]>{
        let allTransaction = (await this.knex.raw(`
        select shopping_cart.id as id , shopping_cart.food_detail_id as food_id , foods."name"  as food_name , shopping_cart.quantity as quantity , food_details.portion as portion, foods.image as image, foods.description as description, food_details.calories as calories
        from shopping_cart 
        left join food_details on shopping_cart.food_detail_id  = food_details.id 
        left join foods on food_details.food_id = foods.id
        where shopping_cart.user_id = ${id}
        `)).rows

        return allTransaction
    } 

    async getLocations(): Promise<any>{
        let locations = await this.knex('locations')
        .select(["id","title","point","address","description"])

        return locations
    }

    async submitBasket(user_id:number,location:number,total_calories:number) :Promise<any>{
        const txn = await this.knex.transaction();
        try {
            let transaction_id = (await txn
                .insert({
                    user_id:user_id,
                    total_calories:total_calories,
                    location_id:location, 
                    status: "pending"
                })
                .into('transactions')
                .returning('id'))[0].id
            
            let shopping_list = await txn
                .select(["food_detail_id","quantity"])
                .from('shopping_cart')
                .where('user_id',user_id)

            shopping_list.forEach((element)=>{
                element['transaction_id'] = transaction_id
                element['quantity'] = element['quantity']
                element['food_detail_id'] = element['food_detail_id']

            })

            await txn
                .insert(shopping_list)
                .into('transaction_details')

            await txn
                .from('shopping_cart')
                .where('user_id',user_id)
                .delete()

            await txn
            .insert({
                user_id:user_id,
                method:"minus",
                calories:total_calories,
                description:"calorie for purchase",
                transaction_id:transaction_id,
                promotion:false
            })
            .into('calorie_change')

            await txn.commit()
            return {result: true, transaction_id:transaction_id}
        } catch (error) {
            console.log(error)
            await txn.rollback();
            return {result: false}
        }
    }

    async getAllOrders(user_id:number) :Promise<any>{
        let orders = (await this.knex.raw(`
        select transactions.id as id, transactions.user_id as user_id, transactions.total_calories as calories, transactions.status as status, locations.title as title, locations.address as address 
        from transactions
        inner join locations
        on transactions.location_id = locations.id
        where user_id = ${user_id}
        order by transactions.created_at DESC
        `)).rows
        if (orders.length < 1){
            return {orders}
        }
        let callArr:any = []
        orders.forEach((elem:any)=>{
            callArr.push(elem.id)
        })

        console.log(orders)
        let food = (await this.knex.raw(`
        select transaction_details.id as id, transaction_details.transaction_id as trans_id, food_details.portion as portion, food_details.calories as calories, foods."name" as "name", foods.image as image, transaction_details.quantity 
        from transaction_details
        inner join food_details
        on transaction_details.food_detail_id = food_details.id 
        inner join foods
        on food_details.food_id = foods.id
        where transaction_id in (${callArr.join(",")})
        `)).rows

        console.log(orders)
        return {orders,food}
    }

    async collectedOrder (order_id:number){
        await this.knex('transactions')
        .update({status:"complete"})
        .where("id",order_id)
    }
}