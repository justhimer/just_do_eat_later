import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    /*********************/
    /***** user info *****/
    /*********************/
    await knex.schema.raw(`
    alter table users alter column created_at type timestamp without time zone;
    alter table users alter column updated_at type timestamp without time zone;
    `);

    await knex.schema.raw(`
    alter table weight_history alter column created_at type timestamp without time zone;
    alter table weight_history alter column updated_at type timestamp without time zone;
    `);

    /****************/
    /***** goal *****/
    /****************/

    await knex.schema.raw(`
    alter table targets alter column created_at type timestamp without time zone;
    alter table targets alter column updated_at type timestamp without time zone;
    `);

    await knex.schema.raw(`
    alter table goals alter column created_at type timestamp without time zone;
    alter table goals alter column updated_at type timestamp without time zone;
    `);

    /********************/
    /***** exercise *****/
    /********************/

    await knex.schema.raw(`
    alter table intensities alter column created_at type timestamp without time zone;
    alter table intensities alter column updated_at type timestamp without time zone;
    `);

    await knex.schema.raw(`
    alter table exercises alter column created_at type timestamp without time zone;
    alter table exercises alter column updated_at type timestamp without time zone;
    `);

    await knex.schema.raw(`
    alter table exercises_history alter column created_at type timestamp without time zone;
    alter table exercises_history alter column updated_at type timestamp without time zone;
    `);

    /****************/
    /***** food *****/
    /****************/

    await knex.schema.raw(`
    alter table locations alter column created_at type timestamp without time zone;
    alter table locations alter column updated_at type timestamp without time zone;
    `);

    await knex.schema.raw(`
    alter table food_types alter column created_at type timestamp without time zone;
    alter table food_types alter column updated_at type timestamp without time zone;
    `);

    await knex.schema.raw(`
    alter table foods alter column created_at type timestamp without time zone;
    alter table foods alter column updated_at type timestamp without time zone;
    `);

    await knex.schema.raw(`
    alter table food_details alter column created_at type timestamp without time zone;
    alter table food_details alter column updated_at type timestamp without time zone;
    `);

    await knex.schema.raw(`
    alter table menus alter column created_at type timestamp without time zone;
    alter table menus alter column updated_at type timestamp without time zone;
    `);


    /***********************/
    /***** transaction *****/
    /***********************/

    await knex.schema.raw(`
    alter table transactions alter column created_at type timestamp without time zone;
    alter table transactions alter column updated_at type timestamp without time zone;
    `);

    await knex.schema.raw(`
    alter table transaction_details alter column created_at type timestamp without time zone;
    alter table transaction_details alter column updated_at type timestamp without time zone;
    `);

}


export async function down(knex: Knex): Promise<void> {
    /*********************/
    /***** user info *****/
    /*********************/
    await knex.schema.raw(`
    alter table users alter column created_at type timestamp with time zone;
    alter table users alter column updated_at type timestamp with time zone;
    `);

    await knex.schema.raw(`
    alter table weight_history alter column created_at type timestamp with time zone;
    alter table weight_history alter column updated_at type timestamp with time zone;
    `);

    /****************/
    /***** goal *****/
    /****************/

    await knex.schema.raw(`
    alter table targets alter column created_at type timestamp with time zone;
    alter table targets alter column updated_at type timestamp with time zone;
    `);

    await knex.schema.raw(`
    alter table goals alter column created_at type timestamp with time zone;
    alter table goals alter column updated_at type timestamp with time zone;
    `);

    /********************/
    /***** exercise *****/
    /********************/

    await knex.schema.raw(`
    alter table intensities alter column created_at type timestamp with time zone;
    alter table intensities alter column updated_at type timestamp with time zone;
    `);

    await knex.schema.raw(`
    alter table exercises alter column created_at type timestamp with time zone;
    alter table exercises alter column updated_at type timestamp with time zone;
    `);

    await knex.schema.raw(`
    alter table exercises_history alter column created_at type timestamp with time zone;
    alter table exercises_history alter column updated_at type timestamp with time zone;
    `);

    /****************/
    /***** food *****/
    /****************/

    await knex.schema.raw(`
    alter table locations alter column created_at type timestamp with time zone;
    alter table locations alter column updated_at type timestamp with time zone;
    `);

    await knex.schema.raw(`
    alter table food_types alter column created_at type timestamp with time zone;
    alter table food_types alter column updated_at type timestamp with time zone;
    `);

    await knex.schema.raw(`
    alter table foods alter column created_at type timestamp with time zone;
    alter table foods alter column updated_at type timestamp with time zone;
    `);

    await knex.schema.raw(`
    alter table food_details alter column created_at type timestamp with time zone;
    alter table food_details alter column updated_at type timestamp with time zone;
    `);

    await knex.schema.raw(`
    alter table menus alter column created_at type timestamp with time zone;
    alter table menus alter column updated_at type timestamp with time zone;
    `);


    /***********************/
    /***** transaction *****/
    /***********************/

    await knex.schema.raw(`
    alter table transactions alter column created_at type timestamp with time zone;
    alter table transactions alter column updated_at type timestamp with time zone;
    `);

    await knex.schema.raw(`
    alter table transaction_details alter column created_at type timestamp with time zone;
    alter table transaction_details alter column updated_at type timestamp with time zone;
    `);
}

