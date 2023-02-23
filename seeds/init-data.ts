import knex, { Knex } from 'knex'
import path from 'path'
import { hashPassword } from '../util/hash';

interface User {
    username: string
    password: string
}

export async function seed(knex: Knex): Promise<void> {
    const txn = await knex.transaction();
    try {
        await knex("users").del();
        await knex("weight_history").del();
        await knex("targets").del();
        await knex("goals").del();
        await knex("intensities").del();
        await knex("exercises").del();
        await knex("exercises_history").del();
        await knex("locations").del();
        await knex("food_details").del();
        await knex("menus").del();
        await knex("transactions").del();
        await knex("transaction_details").del();

        const [{ id }]: Array<{ id: number }> = await txn
            .insert([
                {
                    first_name: "Messi",
                    last_name: "Lionel Andrés",
                    email: "messi@gamil.com",
                    password: "immessi",
                    icon: "messi.webp",
                    calories: "3000",
                    gender: "M",
                    birth_date: "1987-06-24",
                    height: 170,
                    weight: 70,
                },
                {
                    first_name: "Ronaldo",
                    last_name: "Cristiano",
                    email: "ronaldo@gamil.com",
                    password: "imcronaldo",
                    icon: "clong.jpeg",
                    calories: "3000",
                    gender: "M",
                    birth_date: "1985-02-05",
                    height: 187,
                    weight: 80,
                },
                {
                    first_name: "Neymar",
                    last_name: "da Silva",
                    email: "neymar@gamil.com",
                    password: "imneymar",
                    icon: "neymaer.jpeg",
                    calories: "3000",
                    gender: "M",
                    birth_date: "1992-02-05",
                    height: 170,
                    weight: 75,
                }
            ])
            .into("users")
            .returning("id");

        await txn("weight_history").insert([
            {
                weight: 70,
                user_id: id,
            }

        ])
            .into("weight_history")


        let targetsId = await txn.select("id").from("targets").first();
        await txn("targets").insert([
            {
                name: "keep fit",
            },
            {
                name: "weight loss",
            },
            {
                name: "build muscle",
            }
        ])
            .into("targets")
            .returning("targetsId")

        await txn("goals").insert([
            {
                goal_weight: "80kg",
                target_date: "30days",
                status: "success",
                achieved_date: "28days",
                user_id: 1,
                targetsId: targetsId.id
            }
        ])
            .into("goals");


        let intensitiesId = await txn.select("id").from("intensities").first();
        await txn("intensities").insert([
            {
                level: "low"
            },
            {
                level: "mid"
            },
            {
                level: "high"
            }
        ])
            .into("intensities")
            .returning("intensitiesId");

        let exercisesId = await txn.select("id").from("exercises").first();
        await txn("exercises").insert([
            {
                name: "push up",
                intensitiesId: intensitiesId.id
            },
            {
                name: "burbee",
                intensitiesId: intensitiesId.id
            },
            {
                name: "planks",
                intensitiesId: intensitiesId.id
            },
            {
                name: "leg rasise",
                intensitiesId: intensitiesId.id
            },
            {
                name: "lunges",
                intensitiesId: intensitiesId.id
            },
            {
                name: "squats",
                intensitiesId: intensitiesId.id
            }
        ])
            .into("exercises")
            .returning("exercisesId");

        await txn("exercises_history").insert([
            {
                repetitions: "8-15reps",
                calories_burn: "50 cal",
                user_id: id,
                exercisesId: exercisesId.id
            }
        ])
            .into("exercises_history")

        let locationsId = await txn.select("id").from("locations").first();
        await txn("locations").insert([
            {
                address: "15/F Lee Theatre, 99 Percival St, Causeway Bay",
                point: "22.278299, 114.183107",
                description: "位於利舞臺，嶄新設計令人耳目一新，頂尖器材一應俱全，更設有所有分店中面積最大的拳擊訓練專區。Pure Fitness每星期提供60多個課堂逾20項健身班選擇，由私人健身教練為顧客度身設計鍛鍊計劃，並免費提供Wi-Fi、運動服及沐浴用品等服務。",
            },
            {
                address: "18/F California Tower 32 D'Aguilar Street, Central",
                point: "22.280926, 114.155475",
                description: "nood food juice bar serving superfood smoothies, cold-pressed juices and raw food fix"
            },
            {
                address: "Shop 611 & Shop 711, Level 6 & Level 7, K11 MUSEA Victoria Dockside, 18 Salisbury Rd, Tsim Sha Tsui",
                point: "22.293437, 114.174040",
                description: "The biggest PURE Fitness in the world"
            }
        ])
            .into("locations")
            .returning("locationsid")

        let food_detailsID = await txn.select("id").from("food_details").first();
        await txn("food_details").insert([
            {
                portion: "Regular",
                name: "MEATBALLS WITH SPANAKOPITA RICE",
                calories: "536.3"
            },
            {
                portion: "Large",
                name: "MEATBALLS WITH SPANAKOPITA RICE",
                calories: "714.6"
            },
            {
                portion: "Regular",
                name: "BEEF MEX LOADED & SWEET POTATO",
                calories: "406.75"
            },
            {
                portion: "Large",
                name: "BEEF MEX LOADED & SWEET POTATO",
                calories: "570"
            },
            {
                portion: "Regular",
                name: "CREAMY CHICKEN KORMA",
                calories: "290.25"
            },
            {
                portion: "Large",
                name: "CREAMY CHICKEN KORMA",
                calories: "407.5"
            },
            {
                portion: "Regular",
                name: "CHILLI CON CARNE",
                calories: "478.6"
            },
            {
                portion: "Large",
                name: "CHILLI CON CARNE",
                calories: "633.6"
            },
            {
                portion: "Regular",
                name: "PORTUGUESE CHICKEN WITH BROCCOLI RICE",
                calories: "353.8"
            },
            {
                portion: "Large",
                name: "PORTUGUESE CHICKEN WITH BROCCOLI RICE",
                calories: "478.6"
            },
            {
                portion: "Regular",
                name: "CHIPOTLE CHICKEN BURRITO BOWL",
                calories: "675"
            },
            {
                portion: "Regular",
                name: "MANGO CHICKEN & BASMATI RICE",
                calories: "419.1"
            },
            {
                portion: "Regular",
                name: "DELUXE CHICKEN & QUINOA BROWN RICE",
                calories: "409.2"

            },
            {
                portion: "Regular",
                name: "CRUMBED CHICKEN PARMIGIANA",
                calories: "435.6"
            },
            {
                portion: "Regular",
                name: "BUTTER CHICKEN & CAULIFLOWER RICE",
                calories: "438.9"
            },
            {
                portion: "Regular",
                name: "MOROCCAN CHICKEN & PUMPKIN PUREE",
                calories: "333.3"
            },
            {
                portion: "Regular",
                name: "HONEY SOY CHICKEN STIR FRY",
                calories: "367.75"
            },
            {
                portion: "Large",
                name: "HONEY SOY CHICKEN STIR FRY",
                calories: "490.15"
            },
            {
                portion: "Regular",
                name: "THAI GREEN CURRY WITH CAULIFLOWER RICE",
                calories: "244.75"
            },
            {
                portion: "Large",
                name: "THAI GREEN CURRY WITH CAULIFLOWER RICE",
                calories: "332.8"
            },
            {
                portion: "Regular",
                name: "BUTTER CHICKEN & BASMATI RICE",
                calories: "475.2"
            },
            {
                portion: "Regular",
                name: "BLACK PEPPER BEEF, PICKLED CABBAGE & VEGGIE FRIED RICE",
                calories: "340"
            },
            {
                portion: "Large",
                name: "BLACK PEPPER BEEF, PICKLED CABBAGE & VEGGIE FRIED RICE",
                calories: "452.5"
            },
            {
                portion: "Regular",
                name: "MOROCCAN MEATBALLS & COUS COUS",
                calories: "689.5"

            },
            {
                portion: "Regular",
                name: "BEEF BOLOGNESE & PASTA",
                calories: "663"
            },
            {
                portion: "Large",
                name: "BEEF BOLOGNESE & PASTA",
                calories: "884"
            },
            {
                portion: "Regular",
                name: "BEEF HOKKIEN NOODLES",
                calorise: "435.6"
            },
            {
                portion: "Regular",
                name: "PEPPERCORN STEAK & CHIPS",
                calorise: "260.46"
            },
            {
                portion: "Large",
                name: "PEPPERCORN STEAK & CHIPS",
                calorise: "344.85"
            },
            {
                portion: "Regular",
                name: "THYME LEMON CHICKEN & PUMPKIN PUREE",
                calorise: "316.47"
            },
            {
                portion: "Regular",
                name: "MONGOLIAN BEEF WITH BROWN RICE",
                calorise: "437.55"
            },
            {
                portion: "Large",
                name: "MONGOLIAN BEEF WITH BROWN RICE",
                calorise: "538.95"
            },
            {
                portion: "Regular",
                name: "ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES",
                calorise: "513"
            },
            {
                portion: "Regular",
                name: "CHICKEN & CHORIZO PAELLA",
                calorise: "563.5"
            },
            {
                portion: "Regular",
                name: "PERI PERI CHICKEN & VEG",
                calorise: "242.5"
            },
            {
                portion: "Regular",
                name: "TURKEY MINCE POKE BOWL",
                calorise: "403.05"

            },
            {
                portion: "Large",
                name: "TURKEY MINCE POKE BOWL",
                calorise: "555.55"
            },
            {
                portion: "Regular",
                name: "BBQ GRILLED CHICKEN & SWEET POTATO",
                calorise: "318"
            },
            {
                portion: "Large",
                name: "BBQ GRILLED CHICKEN & SWEET POTATO",
                calorise: "425"
            },

        ])
            .into("food_details")
            .returning("food_detailsID");

        let food_typeID = await txn.select("id").from("food_type").first();
        await txn("food_type").insert([
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
            .into("food_type")
            .returning("food_typeID")

        let food_ID = await txn.select("id").from("food").first();
        await txn("food").insert([
            {
                name: "MEATBALLS WITH SPANAKOPITA RICE",
                image: "Meatballs-with-Spanakopita-Rice_1120x.webp",
                description: "Prized for its high nutritional value, our Meatballs, and Spanakopita Rice dish is an excellent food source, low in fat and packed with vitamins and minerals and a guaranteed source of Vitamin E, B and Potassium boosts your well-being and energy level.",
                ingredients: "Spanakopita rice (44.1%), Basmati Rice (99.9%), Curly Kale (24%), Olive Oil (3.4%), Beef Meatballs (44.1%), Tomato and Basil Sauce (11.8%), Carrots (5.5%), Onions (4.4%), Olive Oil (2.6%), Basil (0.66%), Salt (0.22%), Dried basil (0.09%), White pepper (0.04%).",
                allergens: "null",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "BEEF MEX LOADED & SWEET POTATO",
                image: "BEEF-MEX-LOADED-_-SWEET-POTATO_1120x.webp",
                description: "Experience our tantalising and aromatic Mexican beef loaded with enticing sweet potato packed with wholesome and additive-free ingredients.  This mouthwatering, natural, and flavoursome meal is loaded with pure fiber, vitamins, and minerals guaranteed to boost your body function and immune system. ",
                ingredients: "Sweet Potato (55%), Chilli Con Carne (41.7%), Carrots (5.9%), Diced Tomatoes (5.9%), Red Chilli Peppers (5.9%), Kidney Beans (5.9%), Onions (0.88%), Lemon Juice (0.59%), Ground Cinnamon (0.29%), Garlic (0.29%), Cumin Seeds (0.29%), Chilli Powder (0.29%), Mozzarella Cheese (3.3%), Salt, Non-animal Rennet.",
                allergens: "Dairy",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "CREAMY CHICKEN KORMA",
                image: "Creamy-Chicken-Korma_1120x.webp",
                description: "Boost and turbocharge your digestive health with this rich, slow-cooked, and creamy Korma dish which is guaranteed to improve both your digestive health and brain function. Wise men know that Curry is not only great for your heart but also for the reduction of blood pressure by lowering blood sugar levels with the use of centuries-old herbs and spices.",
                ingredients: "Chicken (41.5%), Coconut Milk Canned (33.2%), Peas (10.4%), Broccoli (6.5%), Coriander Seeds (1.2%), Onions (1.1%), Ginger Paste (1%), Chaat Masala Spice Blend (0.79%), Garlic (0.62%), Turmeric (0.46%).",
                allergens: "null",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "CHILLI CON CARNE",
                image: "chilliconcarne_1120x.webp",
                description: "With its hotly-contested origins, our Chilli con Carne spice stew has enormous appeal as a healthy, low-fat option that will kick start your metabolism. Containing chilli peppers, ground meat, tomatoes together with garlic and onions, this dish is sure to ignite visions of Texas or Mexico!!!! ",
                ingredients: "Chilli Con Carne (55.7%), Carrots (5.9%), Diced Tomatoes (5.9%), Red Chilli Peppers (5.9%), Kidney Beans (5.9%), Onions (0.88%), Lemon Juice (0.59%), Ground Cinnamon (0.29%), Garlic (0.29%), Cumin Seeds (0.29%), Chilli Powder (0.29%)], Basmati Rice (42.6%), Parsley (1.6%).",
                allergens: "null",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "PORTUGUESE CHICKEN WITH BROCCOLI RICE",
                image: "Portuguese-Chicken-with-Broccoli-Rice_1120x.webp",
                description: "Ignite the senses with the superfood which superbly caters to all your health needs. Broccoli Rice is not only fat-free but also has powerful antioxidant and anti-inflammatory qualities to supercharge your metabolism. The succulently curated Portuguese chicken, not only juicy and crunchy but heavenly due to its earthy and aromatic qualities designed to invigorate your taste buds.",
                ingredients: "Broccoli Rice (46.9%) [Broccoli, Onion, Garlic, Lemon Juice], Portuguese Chicken (40.6%) [Chicken, Dried Spices, Garlic, Chilli, Salt, Pepper], Portuguese Marinade (12.5%), Iodised Salt, Sugar Garlic, Onion, Vegetable Fat, Potato Starch, Mineral Salt (Potassium Chloride) SPICES: Chilli (13%), Paprika HERBS: Oregano, Parsley (1%).",
                allergens: "null",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "CHIPOTLE CHICKEN BURRITO BOWL",
                image: "ChipotleChickenWorkoutMeals_1120x.jpg",
                description: "A delectable classic with seasoned chicken breast pieces, black beans, basmati Rice and colourful vegetable mix lightly covered in chipotle mayo.",
                ingredients: "Basmati Bean Mix (35%)[Water,  Basmati Rice, Black Beans), Taco Chicken (33%)[Diced Chicken Breast (33%), Canola Oil, Taco Seasoning (Natural Flavour, Yeast Extract, Oleoresin Spice Extracts, Food Acid (330)], Chipotle Sauce (18%) [Mayonnaise (2%) (Free-Range Whole Egg, Food Acid (330), Colour (161b), Sour Cream (Milk, Cultures), Chipotle Peppers (Food Acid (260)), Lemon Juice (Preservative (202)), Corn Starch, Smoky Chipotle Powder, Garlic, Salt, Sugar] Capsicum Onion Mix (13%)(Red Capsicum, Yellow Capsicum, Onion, Red Cabbage, Canola Oil, Taco Seasoning, Salt)",
                Allergens: "Gluten, Wheat, Peanuts",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "MANGO CHICKEN & BASMATI RICE",
                image: "MangoChickenWorkoutMeals_1120x.jpg",
                description: "Mango Chicken with corn, peas and basmati rice.",
                ingredients: "Chicken Breast 36%, Corn, Pea & Basmati Rice36%, Mango Chicken Sauce (Mango Frozen, Red Capsicum, Coriander, Cream coconut, Thickened Cream, garlic, ginger, sweet chilli sauce, Spanish onion, olive oil, corn flour 27%, ",
                Allergens: "Dairy, Gluten",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "DELUXE CHICKEN & QUINOA BROWN RICE",
                image: "Chicken Breast with Quinoa brown rice.",
                description: "Chicken Breast with Quinoa brown rice.",
                ingredients: "Chicken Breast36%, Vegetable Quinoa Brown Rice 36%, Deluxe Sauce (Onion Brown, Mushroom, Thickened Cream, Butter unsalted, Parsley, Salt, Capsicum red, Chili, Oregano, Vegeta )27%",
                Allergens: "Dairy",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "CRUMBED CHICKEN PARMIGIANA",
                image: "Low-Carb-Chicken-Parmigiana_1120x.jpg",
                description: "Our exquisitely prepared Chicken Parmigiana with Roasted Potatoes and Peas dish will improve your overall health biomarkers, but the added protein will curb your cravings.",
                ingredients: "Panko Crumbed Chicken 46%, Roasted Potato 30%, Napolitana Sauce 6% (Tomato crushed, Onion Brown, Olive Oil, Basil, Garlic, Pepper, Salt, Sugar white, Vegeta, Tomato Past), Peas 12%, Cheese (Cheese Mozzarella, Cheese Cheddar) 6%",
                Allergens: "Dairy, Gluten",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "BUTTER CHICKEN & CAULIFLOWER RICE",
                image: "ButterChickenCauliflowerRiceWorkoutMeals_1120x.webp",
                description: "Moroccan Chicken with cauliflower rice",
                ingredients: "Cauliflower (33%), Chicken Tenderloin (32%), Water, Green Peas (3.5%), Corn (3.5%), Crushed Tomato (Tomatoes, Tomato Juice, Citric Acid), Thickened Cream (Milk), Onion, Tandoori Paste ((1.23%) Oil, Durum Wheat Semolina, Salt, Sugar, Acetic Acid, Citric Acid, Cumin, Ginger, Chilli, Mustard, Coriander, Cinnamon, Garlic, Paprika, Onion, Fenugreek, Colour, Celery Seeds, Stabilisers, Black Pepper), Yoghurt (Milk), Vegetable Oil (Soybean), Ghee (Milk), Salt, Garlic Crushed, Ginger Crushed (Soybean), Cumin, Paprika, Curry Powder, Garam Masala, Sugar, Cayenne Pepper, Chilli, Cinnamon, Turmeric. Black Mustard Seeds, Curry Leaves, Lemon Juice",
                Allergens: "Milk, tree nut, soybean",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "MOROCCAN CHICKEN & PUMPKIN PUREE",
                image: "MoroccanChicken_PumpkinPuree_1120x.webp",
                description: "Moroccan Chicken with pumpkin puree and vegetables.",
                ingredients: "Chicken Tenderloin (36%), Thickened Cream (Milk), Pumpkin (18%), Green Peas (15%), Potato (9%), Vegetable Oil (Soybean), Butter (Milk), Moroccan Spice ((1.05%) Salt, Chicken Flavour, Pepper, Garlic, Sugar, Rice Flour, Onion, Paprika, Rosemary, Turmeric, Citric Acid, Capsicum, Coriander, Cumin, Vegetable Oil, Lemon Oil, Ginger), Water, Salt, Roasted Red Pepper, Honey, Red Hot Pepper, Cumin, Sweet Paprika, Coriander, Parsley, Lemon Juice, White Pepper, Garlic Crushed, Carraway.",
                Allergens: "Milk, Soybean",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "HONEY SOY CHICKEN STIR FRY",
                image: "Honey-Soy-Chicken-Stir-Frycopy_1120x.webp",
                description: "Keep it fresh – keep it simple. We use Basmati rice, it's gluten-free and low in fat. It contains all eight essential amino acids, folic acid, and is low in sodium, and has no cholesterol. With a delectable honey soy sauce for maximum flavour and a perfectly tangy mouth-watering result.",
                ingredients: "Honey Soy Chicken Stir-fry (52.5%), Green Beans (6.7%), Broccoli (6.7%), Carrots (3.3%), Oyster Sauce (3.3%), Onions (3.3%), Red Chilli Peppers (3.3%), Honey (2.3%), Low Sodium SOY Sauce (2%), Garlic (1%), Chilli Flakes (0.73%), Basmati Rice (45.9%), Spring onions (1.6%).",
                Allergens: "Gluten, Molluscs, Soy.",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "THAI GREEN CURRY WITH CAULIFLOWER RICE",
                image: "Thai-Green-Curry-with-Cauliflower-Rice_1120x.webp",
                description: "Our famous Thai Green curry will ignite your exotic journey to superfood heaven! Awash with tantalising herbs and spices experience the wonders of the orient without leaving home!",
                ingredients: "Chicken, Coconut Cream, Water, Onion, Broccoli, Carrot, Capsicum, Green Curry Paste, kaffir lime peel, coriander seed, pepper, cumin, turmeric, Vegetable Oil, Garlic, Salt, Kaffir lime powder Cauliflower.",
                Allergens: "null",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "BUTTER CHICKEN & BASMATI RICE",
                image: "ButterChickenWorkoutMeals_1120x.jpg",
                description: "A creamy and scrumptious dish loaded rich in protein chicken promotes excellent brain function and keeps the immune system strong. An excellent source of Vitamin B6 and B12!  This meal also reduces appetite and hunger levels whilst boosting your metabolism.",
                ingredients: "Chicken Breast 36%g, Basmati Rice Pea & Corn 36%, Butter chicken Sauce (Butter Chicken Mix, Ghee, Brown onion, ginger, Garlic, Tomato Puree, Sugar brown, Thickened Cream, Butter Unsalted, Paprika sweet, Turmeric, Cumin, Salt, Chicken Stock, Food Colouring, Tomato Paste, Cashew Paste, Fenugreek leaves, Chilli powder, Garam Masala) 27%. ",
                Allergens: "Dairy, Tree nut",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "BLACK PEPPER BEEF, PICKLED CABBAGE & VEGGIE FRIED RICE",
                image: "BlackPepperBeef_1120x.jpg",
                description: "Tge pepper make you eat more!",
                ingredients: "Black Pepper Beef (50%) [Beef (70%), Black Pepper Sauce (30%) [Water (53.1%), Oyster Sauce (26.5%), Low Sodium SOY Sauce (13.3%) (WHEAT), Corn Flour (3.2%) [Cornflour], Sugar (2.7%), White Pepper (1.3%) [Pepper]]], Brown Veggie Fried Rice (33.3%) [Brown Rice (60.3%), Carrots (9%), Bean Sprouts (9%), Broccoli Rice (9%) [Broccoli, Shallot, Garlic, Lemon Juice], Fried Rice Dressing (7.5%) [Oyster Sauce (52.6%), SESAME Oil (28.6%), Low Sodium SOY Sauce (10.5%) (WHEAT), Garlic (7.9%), Olive Oil (0.44%)], Shallot (5.1%)], Sour Cabbage (16.7%) [Cabbage (54.3%), Rice Vinegar (24.4%), Ginger (10.9%), Olive Oil (5.8%), Brown Sugar (2.7%), Low Sodium SOY Sauce (1.1%) (WHEAT), Mustard Seed, Yellow (0.27%), Fennel Seeds (0.27%), Chinese Five Spice (0.27%)]",
                Allergens: "Soy, Wheat, Sesame",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "MOROCCAN MEATBALLS & COUS COUS",
                image: "MoroccanMeatballsWorkoutMeals_1120x.jpg",
                description: "A delectable classic with Beef Meatballs with a Moroccan Style sauce served with Roasted pumpkin and Couscous.",
                ingredients: "Moroccan Sauce [Roasted Capsicum [Red Peppers (60%), Water, Vinegar, Salt, Sugar], Passata [Tomato, Acidity regulator (330)], Diced Onion, Water, Canola Oil, Tomato Paste [Tomato Paste, Acidity regulator (330)], Crushed Garlic [Garlic, Salt], Corn Starch, Salt, Coriander, Ground Coriander, Ground Cumin, Smoked Paprika, Caraway Seeds, Ground Black Pepper, Preservative (234) [Nisin, Sodium chloride]], SUB4034 Couscous Cooked [Couscous [Durum Wheat Semolina, Water], Water, Canola Oil, Salt, Ground Black Pepper], SUB1003 Beef & Oregano Meatballs Cooked [Meatballs [Beef, Water, Onion, Rice Flour, Vegetable Fibre (460), Salt, Dextrose, Vegetable Powders, Pea Protein, Acidity Regulator (331), Vegetable Gums (407, 415), Yeast Extract, Hydrolysed Vegetable Protein (Maize), Gluten Free Breadcrumbs [rice Flour, Maize Flour, Mineral Salts 450, 500], Dried Oregano, Herbs And Spices]], SUB3004 Roasted Pumpkin 30mm Skin On [Pumpkin Diced 3x3, Canola Oil, Salt, Ground Black Pepper], SUB3033 Roasted Chickpeas [Chickpeas [Chickpeas (60%), Water, Salt], Canola Oil, Salt, Cracked Black Pepper]",
                Allergens: "Gluten",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "BEEF BOLOGNESE & PASTA",
                image: "Beef-Bolognese-_-Pasta_1120x.webp",
                description: "Experience a heavenly journey to Bella Roma with our flavoursome beef bolognese dish straight from Nonna's kitchen chockfull of tasty goodness and healthy life-enhancing good fats!",
                ingredients: "Pasta (50%), Bolognese (50%), Carrots (10%), Onions (6.7%), Olive Oil (3.3%), White Pepper (0.47%), Salt (0.4%), Italian Herbs (0.27%).",
                Allergens: "Gluten",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "BEEF HOKKIEN NOODLES",
                image: "beef-hokkien-noodles_1120x.jpg",
                description: "Beef Hokkien Noodles with sesame.",
                ingredients: "Ingredients: Beef (40%), Hokkien Noodle (24%) (Wheat Flour, Water, Vegetable Oil, Salt, Colours (102, 110)), Onion (13%), Capsicum (13%), Ginger (4%), Garlic (2%), Rice Malt Syrup (2%), Olive Oil (1%), Tamari Sauce (SOY), Sesame Seeds (SESAME). ",
                Allergens: "Soy, Wheat, Sesame",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "PEPPERCORN STEAK & CHIPS",
                image: "ScreenShot2021-05-24at12.14.12pm.webp",
                description: "Celebrate everything great about classic Aussie pub meals without the calorific overload. We have re-created this classic traditional dish using organic condiments to add extra zest and relish to an already epic meal combination.",
                ingredients: "White Potato Chips (43.7%), Beef (43.7%), Water, Cream, Pink Pepper, Green Pepper, Spices, Canola Oil, Dijon Mustard, Onion, Garlic, Green Peas.",
                Allergens: "Dairy",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "THYME LEMON CHICKEN & PUMPKIN PUREE",
                image: "ThymeLemonChicken_PumpkinPureeWorkoutMeals_1120x.webp",
                description: "Moroccan Chicken with cauliflower rice",
                ingredients: "Chicken Tenderloin (36%), Pumpkin (30%), Chicken Stock ((12%) Water, Chicken, Carrots, Celery, Cabbage, Onions, Parsley, Sage Extract, Natural Antioxidant (Rosemary Extract), Sugar, Salt, Glucose, Yeast Extract), Green Peas (15%), Butter (Milk), Thickened Cream (Milk), Vegetable Oil (Soybean), Vegetable Stock Powder, Lemon Juice (1.40%), Corn Flour Wheaten (Wheat), Water, Salt, Sugar, Thyme (0.04%), Garlic Crushed, White Pepper.",
                Allergens: "Milk, Wheat.",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "MONGOLIAN BEEF WITH BROWN RICE",
                image: "MongolianBeef_1120x.webp",
                description: "Visit the orient and experience our mouthwatering and tantalising Mongolian beef dish crammed with zesty herbs and spices to ignite the senses.",
                ingredients: "Beef (68.4%), Brown Rice (19%), Soy sauce (3%), Rice Vinegar (2.3%), Hoisin Sauce (2.3%), Olive Oil (1.6%), Garlic minced (1.5%), Cornstarch (0.76%), Spring Onion Raw (0.76%), Sesame seeds (0.3%).",
                Allergens: "Wheat, Soy, Sesame.",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES",
                image: "AsianChickenStirFryWorkoutMeals_1120x.jpg",
                description: "A delectable classic with Asian Chicken Stir Fry & Hokkien Noodles!",
                ingredients: "Water, Higher Welfare Chicken (18%), Hokkien Noodles (17%) [Wheat Flour, Water, Gluten, Salt, Mineral salts (500, 501, 341), Vegetable oil (Canola oil), Natural Colour (160b), Preservative (202)], Roasted Red Capsicum (10%) (Red Peppers, Water, Vinegar, Salt, Sugar), Wombok (7%), Red Onion (6%), Soy Sauce (6%) (Soy Bean, Wheat, Salt, Water), Bean Cross Cut (4%), Demerara Sugar (3.5%), Ginger Crushed (1%) (Acidity Regulator (270)), Canola Oil, Garlic Minced, Corn Starch, White Sesame Seeds, Salt, Black Pepper",
                Allergens: "Gluten, Wheat, Sesame,Soy",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "CHICKEN & CHORIZO PAELLA",
                image: "ChickenChrizoWorkoutMeals_1120x.jpg",
                description: "A delectable classic with traditional Spanish style Paella with Australian chicken, chorizo and mixed vegetables.",
                ingredients: "Cooked Long Grain Rice (35%) (Long Grain Rice, Water), Chicken Breast(22%), Water, Chorizo (9%) [Pork, Salt, Modified Starch (1412), Spices,Corn Syrup Solids, Garlic, Wheat Fibre, Mineral Salt (451), Antioxidant(316), Preservative (250). Wood Smoked], Onion, Peas, Carrots, Celery, Fire Roasted Capsicum, Vegetable Oil, Chicken Style Stock Powder, Corn Starch, Crushed Garlic, Cajun Spice [Anticaking Agent (551), Colour (160a)],Paprika Powder, Turmeric, Cumin, Cracked Black Pepper.",
                Allergens: "Gluten, Milk, Soy",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "PERI PERI CHICKEN & VEG",
                image: "PeriPeriChickenLowcarbWorkoutMeals_1120x.jpg",
                description: "Peri Peri Chicken & Vegetables",
                ingredients: "Chicken Breast (50%), Broccoli (20%), Green Beans (16%), Carrot (14%)",
                Allergens: "null",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "TURKEY MINCE POKE BOWL",
                image: "pokebowl_1120x.webp",
                description: "You don’t need to be a hipster to enjoy our Turkey Poke Bowl! This the dish is loaded with good fats to support muscle strength and growth. You will love the Star Power of this deconstructed Poke, an all-year-round, health-orientated wonder meal.",
                ingredients: "Vermicelli rice noodles (53.8%), Turkey San Choy Bao (44.6%), Onion, Garlic, Soy Sauce, Chilli, Honey, Lemon Juice, Wombok, Carrots, Mint, Coriander, Crushed Peanuts, Spring Onion Raw (1.5%).",
                Allergens: "Peanuts, Sesame, Soy, Tree nuts.",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
            {
                name: "BBQ GRILLED CHICKEN & SWEET POTATO",
                image: "0Z8FfSmw_1120x.jpg",
                description: "Savour this tantalising and zesty dish packed with delicious superfoods and loaded with hearty good fats.",
                ingredients: "Plain Sweet Potato Mash (50%) [sweet potato, olive oil, salt, pepper], Chicken (41.7%) [Chicken Breast], BBQ Sauce (8.3%) [Tomatoes (from Paste, Food Acid (Citric)) 45%, Sugar, Water, Cornflour (from WHEAT), Food Acids (Acetic, Citric), Salt, Glucose Syrup, Colour (Caramel (150c)), Thickener (Pectin), Tamarind Paste, Yeast Extract, Clove, Nutmeg, Onion 0.5%, Pepper]",
                Allergens: "Gluten",
                preaparatoin: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
                food_typeID: food_typeID.id
            },
        ])
            .into("food")
            .returning("food_ID")



        await txn("meun").insert([
            {
                food_ID: food_ID.id,
                locationsId: locationsId.id
            }
        ])
            .into("meun")

        let transactionsID = await txn.select("id").from("transactions").first();
        await txn("transactions").insert([
            {
                total_calories: "400cal",
                status: "pending",
                user_id: id,
                locationsId: locationsId.id
            },
            {
                total_calories: "400cal",
                status: "picked up",
            }
        ])
            .into("transaction")
            .returning("transactionsID");

        let transaction_detailsID = await txn.select("id").from("transaction_details").first();
        await txn("transaction_details").insert([
            {
                quantity: "1",
                transactionsID: transactionsID.id,
                food_detailsID: food_detailsID.id
            }
        ])
            .into("transaction_details")
            .returning("transaction_detailsID");


        await txn.commit();
        return;
    } catch (e) {
        await txn.rollback();
        return;
    }
}