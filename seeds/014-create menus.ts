import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries


    let food_id = await knex.select('id').from('foods').first()
    let location_id = await knex.select('id').from('locations').first()

    await knex("menus").insert([
        {
            food_id: food_id.id,
            location_id: location_id.id
        }
    ])
}