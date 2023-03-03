import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    /********************/
    /***** exercise *****/
    /********************/

    await knex.schema.raw(`
        ALTER TABLE exercises ADD COLUMN "thumbnail" TEXT;
    `);
}


export async function down(knex: Knex): Promise<void> {
    /********************/
    /***** exercise *****/
    /********************/

    await knex.schema.raw(`
        ALTER TABLE exercises DROP COLUMN "thumbnail";
    `);
}

