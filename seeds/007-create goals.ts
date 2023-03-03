import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries


    let user_id = await knex.select('id').from('users').first();
    let targets_id = await knex.select('id').from('targets').first();



    await knex("goals").insert([
        {
            goal_weight: 80,
            target_date: "2023-12-12",
            status: "success",
            achieved_date: "2023-12-11",
            user_id: user_id.id,
            target_id: targets_id.id
        }
    ])

}