import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries


    let user_id = await knex.select('id').from('users').first();
    let exercise_id = await knex.select('id').from('exercises').first();
    // Inserts seed enteries
    await knex("exercises_history").insert([
        {
            repetitions: 8,
            calories_burn: 50,
            user_id: user_id.id,
            exercise_id: exercise_id.id
        }
    ])
}