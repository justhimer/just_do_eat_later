import { Knex } from "knex";


export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing entries
    await knex("calorie_change").del();
    await knex("menus").del();
    await knex("transaction_details").del();
    await knex("transactions").del();
    await knex("locations").del();
    await knex("food_details").del();
    await knex("foods").del();
    await knex("food_types").del();
    await knex("goals").del();
    await knex("targets").del();
    await knex("weight_history").del();
    await knex("exercises_history").del();
    await knex("exercises").del();
    await knex("intensities").del();
    await knex("users").del();
}