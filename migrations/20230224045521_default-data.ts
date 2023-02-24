import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw("ALTER TABLE users ALTER COLUMN icon SET DEFAULT 'default_user_icon.png'");
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw("ALTER TABLE users ALTER COLUMN icon DROP DEFAULT");
}

