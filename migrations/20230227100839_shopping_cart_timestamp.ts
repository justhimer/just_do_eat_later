import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.raw(`
    alter table shopping_cart alter column created_at type timestamp without time zone;
    alter table shopping_cart alter column updated_at type timestamp without time zone;
    `);
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.raw(`
    alter table shopping_cart alter column created_at type timestamp with time zone;
    alter table shopping_cart alter column updated_at type timestamp with time zone;
    `);
    
}

