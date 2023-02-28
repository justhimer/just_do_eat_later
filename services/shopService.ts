import type {Knex} from 'knex'
import { transactionDetails } from '../util/interfaces';

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

        // console.log("allFood: ",allFood)
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
            food_details_id: food_id,
            quantity: quantity
        })
        .into('shopping_cart')
    }

    async addItem(id:number,food_id:number,quantity:number){
        await this.knex('shopping_cart')
        .where({
            user_id: id,
            food_details_id: food_id
        })
        .increment("quantity",quantity)
    }

    async deleteUnit(id:number,food_id:number,quantity:number){
        await this.knex('shopping_cart')
        .where({
            user_id: id,
            food_details_id: food_id
        })
        .decrement("quantity",quantity)
    }

    async deleteItem(id:number,food_id:number){
        await this.knex('shopping_cart')
        .where({
            user_id: id,
            food_details_id: food_id
        })
        .del()
    }

    async deleteAll(id:number){
        await this.knex('shopping_cart')
        .where("user_id",id)
        .del()
    }

    async getItemCount(id:number,food_id:number): Promise<any>{
        let itemCount = await this.knex('shopping_cart')
        .select('quantity')
        .where({
            "user_id":id,
            "food_details_id":food_id
        })
        .first()

        return itemCount
    }

    async getTotalCount(id:number): Promise<any>{
        let totalCount = await this.knex('shopping_cart')
        .sum("quantity")
        .where("user_id",id)
        .first()

        return totalCount
    }

    async getAll(id:number): Promise<transactionDetails[]>{
        let allTransaction = (await this.knex.raw(`
        select shopping_cart.id as id , shopping_cart.food_details_id as food_id , foods."name"  as food_name , shopping_cart.quantity as quantity , food_details.portion as portion, foods.image as image, foods.description as description, food_details.calories as calories
        from shopping_cart 
        left join food_details on shopping_cart.food_details_id  = food_details.id 
        left join foods on food_details.food_id = foods.id
        where shopping_cart.user_id = ${id}
        `)).rows

        return allTransaction
    } 

    async getLocations(): Promise<any>{
        let locations = await this.knex('locations')
        .select(["point","address","description"])

        return locations
    }
}