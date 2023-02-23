import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    /*********************/
    /***** user info *****/
    /*********************/

    await knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('first_name');
        table.string('last_name')
        table.string('email').notNullable();
        table.text('password').notNullable();
        table.string('icon');
        table.integer('calories');
        table.string('gender');
        table.date('birth_date');
        table.integer('height').unsigned();
        table.integer('weight').unsigned();
        table.timestamps(false, true);
    });

    await knex.schema.createTable('weight_history', (table) => {
        table.increments();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('weight');
        table.timestamps(false, true);
    });

    /****************/
    /***** goal *****/
    /****************/

    await knex.schema.createTable('targets', (table) => {
        table.increments();
        table.string('name');
        table.timestamps(false, true);
    });

    await knex.schema.createTable('goals', (table) => {
        table.increments();
        table.integer('target_id').unsigned();
        table.foreign('target_id').references('targets.id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('goal_weight');
        table.timestamp('target_date');
        table.string('status');
        table.timestamp('achieved_date')
        table.timestamps(false, true);
    });

    /********************/
    /***** exercise *****/
    /********************/

    await knex.schema.createTable('intensities', (table) => {
        table.increments();
        table.string('level');
        table.timestamps(false, true);
    });

    await knex.schema.createTable('exercises', (table) => {
        table.increments();
        table.string('name');
        table.integer('intensity_id').unsigned();
        table.foreign('intensity_id').references('intensities.id')
        table.timestamps(false, true);
    });

    await knex.schema.createTable('exercises_history', (table) => {
        table.increments();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('exercise_id').unsigned();
        table.foreign('exercise_id').references('exercises.id');
        table.integer('repetitions').unsigned();
        table.integer('calories_burn');
        table.timestamps(false, true);
    });

    /****************/
    /***** food *****/
    /****************/

    await knex.schema.createTable('locations', (table) => {
        table.increments();
        table.text('address');
        table.point('point');
        table.text('description');
        table.timestamps(false, true);
    });

    await knex.schema.createTable('food_types', (table) => {
        table.increments();
        table.string('name');
        table.timestamps(false, true);
    });

    await knex.schema.createTable('foods', (table) => {
        table.increments();
        table.integer('food_type_id').unsigned();
        table.foreign('food_type_id').references('food_types.id');
        table.string('name');
        table.string('image');
        table.text('description');
        table.jsonb('ingredients');
        table.jsonb('allergens');
        table.text('preparation');
        table.timestamps(false, true);
    });

    await knex.schema.createTable('food_details', (table) => {
        table.increments();
        table.integer('food_id').unsigned();
        table.foreign('food_id').references('foods.id');
        table.string('portion');
        table.integer('calories');
        table.timestamps(false, true);
    });

    await knex.schema.createTable('menus', (table) => {
        table.increments();
        table.integer('food_id').unsigned();
        table.foreign('food_id').references('foods.id');
        table.integer('location_id').unsigned();
        table.foreign('location_id').references('locations.id');
    });

    /***********************/
    /***** transaction *****/
    /***********************/

    await knex.schema.createTable('transactions', (table) => {
        table.increments();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('users.id');
        table.integer('location_id').unsigned();
        table.foreign('location_id').references('locations.id');
        table.integer('total_calories');
        table.string('status');
        table.timestamps(false, true);
    });

    await knex.schema.createTable('transaction_details', (table) => {
        table.increments();
        table.integer('transaction_id').unsigned();
        table.foreign('transaction_id').references('transactions.id');
        table.integer('food_detail_id').unsigned();
        table.foreign('food_detail_id').references('food_details.id');
        table.integer('quantity');
        table.timestamps(false, true);
    });

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('transaction_details');
    await knex.schema.dropTable('transactions');
    await knex.schema.dropTable('menus');
    await knex.schema.dropTable('food_details');
    await knex.schema.dropTable('foods');
    await knex.schema.dropTable('food_types');
    await knex.schema.dropTable('locations');
    await knex.schema.dropTable('exercises_history');
    await knex.schema.dropTable('exercises');
    await knex.schema.dropTable('intensities');
    await knex.schema.dropTable('goals');
    await knex.schema.dropTable('targets');
    await knex.schema.dropTable('weight_history');
    await knex.schema.dropTable('users');
}

