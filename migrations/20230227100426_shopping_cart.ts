import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('shopping_cart', (table) => {
        table.increments();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('food_detail_id').unsigned();
        table.foreign('food_detail_id').references('food_details.id');
        table.integer('quantity').unsigned();
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('shopping_cart');
}

