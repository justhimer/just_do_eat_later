import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries
    await knex("intensities").del();

    await knex("intensities").insert([
        {
            level: "low"
        },
        {
            level: "mid"
        },
        {
            level: "high"
        }
    ])
} 
