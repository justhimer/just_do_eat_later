import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries


    await knex("food_types").insert([
        {
            name: "MEATBALLS WITH SPANAKOPITA RICE"
        },
        {
            name: "BEEF MEX LOADED & SWEET POTATO"
        },
        {
            name: "CREAMY CHICKEN KORMA"
        },
        {
            name: "CHILLI CON CARNE"
        },
        {
            name: "PORTUGUESE CHICKEN WITH BROCCOLI RICE"
        },
        {
            name: "CHIPOTLE CHICKEN BURRITO BOWL"
        },
        {
            name: "MANGO CHICKEN & BASMATI RICE"
        },
        {
            name: "DELUXE CHICKEN & QUINOA BROWN RICE"
        },
        {
            name: "CRUMBED CHICKEN PARMIGIANA"
        },
        {
            name: "BUTTER CHICKEN & CAULIFLOWER RICE"
        },
        {
            name: "MOROCCAN CHICKEN & PUMPKIN PUREE"
        },
        {
            name: "HONEY SOY CHICKEN STIR FRY"
        },
        {
            name: "THAI GREEN CURRY WITH CAULIFLOWER RICE"
        },
        {
            name: "BUTTER CHICKEN & BASMATI RICE"
        },
        {
            name: "BLACK PEPPER BEEF, PICKLED CABBAGE & VEGGIE FRIED RICE"
        },
        {
            name: "MOROCCAN MEATBALLS & COUS COUS"
        },
        {
            name: "BEEF BOLOGNESE & PASTA"
        },
        {
            name: "BEEF HOKKIEN NOODLES"
        },
        {
            name: "PEPPERCORN STEAK & CHIPS"
        },
        {
            name: "THYME LEMON CHICKEN & PUMPKIN PUREE"
        },
        {
            name: "MONGOLIAN BEEF WITH BROWN RICE"
        },
        {
            name: "ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES"
        },
        {
            name: "CHICKEN & CHORIZO PAELLA"
        },
        {
            name: "PERI PERI CHICKEN & VEG"
        },
        {
            name: "TURKEY MINCE POKE BOWL"
        },
        {
            name: "BBQ GRILLED CHICKEN & SWEET POTATO"
        },
    ])
}