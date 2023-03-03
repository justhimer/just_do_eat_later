import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    /*********************/
    /***** user info *****/
    /*********************/
    await knex.schema.raw(`
        alter table users alter column calories type decimal(6,1);
    `);

    /********************/
    /***** exercise *****/
    /********************/
    await knex.schema.raw(`
        alter table exercises alter column calories type decimal(6,1);
    `);

    await knex.schema.raw(`
        alter table exercises_history alter column calories_burn type decimal(6,1);
    `);

}


export async function down(knex: Knex): Promise<void> {
    /*********************/
    /***** user info *****/
    /*********************/
    await knex.schema.raw(`
        alter table users alter column calories type integer;
    `);

    /********************/
    /***** exercise *****/
    /********************/
    await knex.schema.raw(`
        alter table exercises alter column calories type integer;
    `);

    await knex.schema.raw(`
        alter table exercises_history alter column calories_burn type integer;
    `);
}

