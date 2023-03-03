import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries


    await knex("targets").insert([
        {
            name: "keep fit",

        },
        {
            name: "weight loss",

        },
        {
            name: "build muscle",

        }
    ])

}
