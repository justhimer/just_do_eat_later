import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    /**************************/
    /***** calorie change *****/
    /**************************/
    await knex.schema.raw(`
        alter table calorie_change alter column calories type decimal(6,1);
    `);
}


export async function down(knex: Knex): Promise<void> {
    /**************************/
    /***** calorie change *****/
    /**************************/
    await knex.schema.raw(`
        alter table calorie_change alter column calories type integer;
    `);
}

