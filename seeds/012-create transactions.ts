import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries


    let user_id = await knex.select('id').from('users').first();
    let location_id = await knex.select('id').from('locations').first();



    await knex("transactions").insert([
        {
            total_calories: 400,
            status: "pending",
            user_id: user_id.id,
            location_id: location_id.id
        },
        {
            total_calories: 400,
            status: "complete",
        }
    ])
}