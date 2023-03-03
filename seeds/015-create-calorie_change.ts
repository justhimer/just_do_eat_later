import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    
    let user_id = await knex.select('id').from('users').first()
    let transaction_id = await knex.select('id').from('transactions').first();
    let food_detail_id = await knex.select('id').from('food_details').first();
    
    
    await knex("calorie_change").insert([
        {
            user_id:user_id.id,
            method:"plus",
            calories:3000,
            description:"vip",
            transaction_id: null,
            promotion:false
        },
        {
            user_id:user_id.id,
            method:"minus",
            calories: 400,
            description: "calorie for purchase",
            transaction_id: transaction_id.id,
            promotion:false
        }
    ])
}