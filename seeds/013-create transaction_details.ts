import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries


    let transaction_id = await knex.select('id').from('transactions').first();
    let food_detail_id = await knex.select('id').from('food_details').first();



    await knex("transaction_details").insert([
        {
            quantity: 1,
            transaction_id: transaction_id.id,
            food_detail_id: food_detail_id.id
        }
    ])
}