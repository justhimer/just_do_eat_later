import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries


    let user_id = await knex.select('id').from('users').first();

    await knex("weight_history").insert([
        {
            weight: 70,
            user_id: user_id.id
        }

    ])
}