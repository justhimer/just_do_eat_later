import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('calorie_change', (table) => {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.text('method').notNullable();
        table.integer('calories').notNullable();
        table.text('description');
        table.integer('transaction_id').unsigned();
        table.foreign('transaction_id').references('transactions.id')
        table.integer('exercises_history_id').unsigned();
        table.foreign('exercises_history_id').references('exercises_history.id');
        table.boolean('promotion').notNullable();
        table.integer('promotion_id');
        table.timestamps(false, true);
    });

    await knex.schema.raw(`
        ALTER TABLE users ADD COLUMN subscribed boolean;
    `);
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('calorie_change')

    await knex.schema.raw(`
        ALTER TABLE users drop COLUMN subscribed;
    `);
}

