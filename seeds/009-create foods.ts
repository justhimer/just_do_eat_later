import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries


    let food_type_id = await knex.select('id').from('food_types').first()
    let food_type_id2 = (await knex.select('id').from('food_types'))[1]
    let food_type_id3 = (await knex.select('id').from('food_types'))[2]
    let food_type_id4 = (await knex.select('id').from('food_types'))[3]
    let food_type_id5 = (await knex.select('id').from('food_types'))[4]
    let food_type_id6 = (await knex.select('id').from('food_types'))[5]
    let food_type_id7 = (await knex.select('id').from('food_types'))[6]
    let food_type_id8 = (await knex.select('id').from('food_types'))[7]
    let food_type_id9 = (await knex.select('id').from('food_types'))[8]
    let food_type_id10 = (await knex.select('id').from('food_types'))[9]
    let food_type_id11 = (await knex.select('id').from('food_types'))[10]
    let food_type_id12 = (await knex.select('id').from('food_types'))[11]
    let food_type_id13 = (await knex.select('id').from('food_types'))[12]
    let food_type_id14 = (await knex.select('id').from('food_types'))[13]
    let food_type_id15 = (await knex.select('id').from('food_types'))[14]
    let food_type_id16 = (await knex.select('id').from('food_types'))[15]
    let food_type_id17 = (await knex.select('id').from('food_types'))[16]
    let food_type_id18 = (await knex.select('id').from('food_types'))[17]
    let food_type_id19 = (await knex.select('id').from('food_types'))[18]
    let food_type_id20 = (await knex.select('id').from('food_types'))[19]
    let food_type_id21 = (await knex.select('id').from('food_types'))[20]
    let food_type_id22 = (await knex.select('id').from('food_types'))[21]
    let food_type_id23 = (await knex.select('id').from('food_types'))[22]
    let food_type_id24 = (await knex.select('id').from('food_types'))[23]
    let food_type_id25 = (await knex.select('id').from('food_types'))[24]
    let food_type_id26 = (await knex.select('id').from('food_types'))[25]







    await knex("foods").insert([
        {
            name: "MEATBALLS WITH SPANAKOPITA RICE",
            image: "Meatballs-with-Spanakopita-Rice_1120x.webp",
            description: "Prized for its high nutritional value, our Meatballs, and Spanakopita Rice dish is an excellent food source, low in fat and packed with vitamins and minerals and a guaranteed source of Vitamin E, B and Potassium boosts your well-being and energy level.",
            ingredients: { ingredients: "Spanakopita rice (44.1%), Basmati Rice (99.9%), Curly Kale (24%), Olive Oil (3.4%), Beef Meatballs (44.1%), Tomato and Basil Sauce (11.8%), Carrots (5.5%), Onions (4.4%), Olive Oil (2.6%), Basil (0.66%), Salt (0.22%), Dried basil (0.09%), White pepper (0.04%)." },
            allergens: { allergens: "null" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id.id
        },
        {
            name: "BEEF MEX LOADED & SWEET POTATO",
            image: "BEEF-MEX-LOADED-_-SWEET-POTATO_1120x.webp",
            description: "Experience our tantalising and aromatic Mexican beef loaded with enticing sweet potato packed with wholesome and additive-free ingredients.  This mouthwatering, natural, and flavoursome meal is loaded with pure fiber, vitamins, and minerals guaranteed to boost your body function and immune system. ",
            ingredients: { ingredients: "Sweet Potato (55%), Chilli Con Carne (41.7%), Carrots (5.9%), Diced Tomatoes (5.9%), Red Chilli Peppers (5.9%), Kidney Beans (5.9%), Onions (0.88%), Lemon Juice (0.59%), Ground Cinnamon (0.29%), Garlic (0.29%), Cumin Seeds (0.29%), Chilli Powder (0.29%), Mozzarella Cheese (3.3%), Salt, Non-animal Rennet." },
            allergens: { allergens: "Dairy" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id2.id
        },
        {
            name: "CREAMY CHICKEN KORMA",
            image: "Creamy-Chicken-Korma_1120x.webp",
            description: "Boost and turbocharge your digestive health with this rich, slow-cooked, and creamy Korma dish which is guaranteed to improve both your digestive health and brain function. Wise men know that Curry is not only great for your heart but also for the reduction of blood pressure by lowering blood sugar levels with the use of centuries-old herbs and spices.",
            ingredients: { ingredients: "Chicken (41.5%), Coconut Milk Canned (33.2%), Peas (10.4%), Broccoli (6.5%), Coriander Seeds (1.2%), Onions (1.1%), Ginger Paste (1%), Chaat Masala Spice Blend (0.79%), Garlic (0.62%), Turmeric (0.46%)." },
            allergens: { allergens: "null" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id3.id
        },
        {
            name: "CHILLI CON CARNE",
            image: "chilliconcarne_1120x.webp",
            description: "With its hotly-contested origins, our Chilli con Carne spice stew has enormous appeal as a healthy, low-fat option that will kick start your metabolism. Containing chilli peppers, ground meat, tomatoes together with garlic and onions, this dish is sure to ignite visions of Texas or Mexico!!!! ",
            ingredients: { ingredients: "Chilli Con Carne (55.7%), Carrots (5.9%), Diced Tomatoes (5.9%), Red Chilli Peppers (5.9%), Kidney Beans (5.9%), Onions (0.88%), Lemon Juice (0.59%), Ground Cinnamon (0.29%), Garlic (0.29%), Cumin Seeds (0.29%), Chilli Powder (0.29%)], Basmati Rice (42.6%), Parsley (1.6%)." },
            allergens: { allergens: "null" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id4.id
        },
        {
            name: "PORTUGUESE CHICKEN WITH BROCCOLI RICE",
            image: "Portuguese-Chicken-with-Broccoli-Rice_1120x.webp",
            description: "Ignite the senses with the superfood which superbly caters to all your health needs. Broccoli Rice is not only fat-free but also has powerful antioxidant and anti-inflammatory qualities to supercharge your metabolism. The succulently curated Portuguese chicken, not only juicy and crunchy but heavenly due to its earthy and aromatic qualities designed to invigorate your taste buds.",
            ingredients: { ingredients: "Broccoli Rice (46.9%) [Broccoli, Onion, Garlic, Lemon Juice], Portuguese Chicken (40.6%) [Chicken, Dried Spices, Garlic, Chilli, Salt, Pepper], Portuguese Marinade (12.5%), Iodised Salt, Sugar Garlic, Onion, Vegetable Fat, Potato Starch, Mineral Salt (Potassium Chloride) SPICES: Chilli (13%), Paprika HERBS: Oregano, Parsley (1%)." },
            allergens: { allergens: "null" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id5.id
        },
        {
            name: "CHIPOTLE CHICKEN BURRITO BOWL",
            image: "ChipotleChickenWorkoutMeals_1120x.jpg",
            description: "A delectable classic with seasoned chicken breast pieces, black beans, basmati Rice and colourful vegetable mix lightly covered in chipotle mayo.",
            ingredients: { ingredients: "Basmati Bean Mix (35%)[Water,  Basmati Rice, Black Beans), Taco Chicken (33%)[Diced Chicken Breast (33%), Canola Oil, Taco Seasoning (Natural Flavour, Yeast Extract, Oleoresin Spice Extracts, Food Acid (330)], Chipotle Sauce (18%) [Mayonnaise (2%) (Free-Range Whole Egg, Food Acid (330), Colour (161b), Sour Cream (Milk, Cultures), Chipotle Peppers (Food Acid (260)), Lemon Juice (Preservative (202)), Corn Starch, Smoky Chipotle Powder, Garlic, Salt, Sugar] Capsicum Onion Mix (13%)(Red Capsicum, Yellow Capsicum, Onion, Red Cabbage, Canola Oil, Taco Seasoning, Salt)" },
            allergens: { allergens: "Gluten, Wheat, Peanuts" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id6.id
        },
        {
            name: "MANGO CHICKEN & BASMATI RICE",
            image: "MangoChickenWorkoutMeals_1120x.jpg",
            description: "Mango Chicken with corn, peas and basmati rice.",
            ingredients: { ingredients: "Chicken Breast 36%, Corn, Pea & Basmati Rice36%, Mango Chicken Sauce (Mango Frozen, Red Capsicum, Coriander, Cream coconut, Thickened Cream, garlic, ginger, sweet chilli sauce, Spanish onion, olive oil, corn flour 27%, " },
            allergens: { allergens: "Dairy, Gluten" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id7.id
        },
        {
            name: "DELUXE CHICKEN & QUINOA BROWN RICE",
            image: "Chicken Breast with Quinoa brown rice.",
            description: "Chicken Breast with Quinoa brown rice.",
            ingredients: { ingredients: "Chicken Breast36%, Vegetable Quinoa Brown Rice 36%, Deluxe Sauce (Onion Brown, Mushroom, Thickened Cream, Butter unsalted, Parsley, Salt, Capsicum red, Chili, Oregano, Vegeta )27%" },
            allergens: { allergens: "Dairy" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id8.id
        },
        {
            name: "CRUMBED CHICKEN PARMIGIANA",
            image: "Low-Carb-Chicken-Parmigiana_1120x.jpg",
            description: "Our exquisitely prepared Chicken Parmigiana with Roasted Potatoes and Peas dish will improve your overall health biomarkers, but the added protein will curb your cravings.",
            ingredients: { ingredients: "Panko Crumbed Chicken 46%, Roasted Potato 30%, Napolitana Sauce 6% (Tomato crushed, Onion Brown, Olive Oil, Basil, Garlic, Pepper, Salt, Sugar white, Vegeta, Tomato Past), Peas 12%, Cheese (Cheese Mozzarella, Cheese Cheddar) 6%" },
            allergens: { allergens: "Dairy, Gluten" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id9.id
        },
        {
            name: "BUTTER CHICKEN & CAULIFLOWER RICE",
            image: "ButterChickenCauliflowerRiceWorkoutMeals_1120x.webp",
            description: "Moroccan Chicken with cauliflower rice",
            ingredients: { ingredients: "Cauliflower (33%), Chicken Tenderloin (32%), Water, Green Peas (3.5%), Corn (3.5%), Crushed Tomato (Tomatoes, Tomato Juice, Citric Acid), Thickened Cream (Milk), Onion, Tandoori Paste ((1.23%) Oil, Durum Wheat Semolina, Salt, Sugar, Acetic Acid, Citric Acid, Cumin, Ginger, Chilli, Mustard, Coriander, Cinnamon, Garlic, Paprika, Onion, Fenugreek, Colour, Celery Seeds, Stabilisers, Black Pepper), Yoghurt (Milk), Vegetable Oil (Soybean), Ghee (Milk), Salt, Garlic Crushed, Ginger Crushed (Soybean), Cumin, Paprika, Curry Powder, Garam Masala, Sugar, Cayenne Pepper, Chilli, Cinnamon, Turmeric. Black Mustard Seeds, Curry Leaves, Lemon Juice" },
            allergens: { allergens: "Milk, tree nut, soybean" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id10.id
        },
        {
            name: "MOROCCAN CHICKEN & PUMPKIN PUREE",
            image: "MoroccanChicken_PumpkinPuree_1120x.webp",
            description: "Moroccan Chicken with pumpkin puree and vegetables.",
            ingredients: { ingredients: "Chicken Tenderloin (36%), Thickened Cream (Milk), Pumpkin (18%), Green Peas (15%), Potato (9%), Vegetable Oil (Soybean), Butter (Milk), Moroccan Spice ((1.05%) Salt, Chicken Flavour, Pepper, Garlic, Sugar, Rice Flour, Onion, Paprika, Rosemary, Turmeric, Citric Acid, Capsicum, Coriander, Cumin, Vegetable Oil, Lemon Oil, Ginger), Water, Salt, Roasted Red Pepper, Honey, Red Hot Pepper, Cumin, Sweet Paprika, Coriander, Parsley, Lemon Juice, White Pepper, Garlic Crushed, Carraway." },
            allergens: { allergens: "Milk, Soybean" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id11.id
        },
        {
            name: "HONEY SOY CHICKEN STIR FRY",
            image: "Honey-Soy-Chicken-Stir-Frycopy_1120x.webp",
            description: "Keep it fresh – keep it simple. We use Basmati rice, it's gluten-free and low in fat. It contains all eight essential amino acids, folic acid, and is low in sodium, and has no cholesterol. With a delectable honey soy sauce for maximum flavour and a perfectly tangy mouth-watering result.",
            ingredients: { ingredients: "Honey Soy Chicken Stir-fry (52.5%), Green Beans (6.7%), Broccoli (6.7%), Carrots (3.3%), Oyster Sauce (3.3%), Onions (3.3%), Red Chilli Peppers (3.3%), Honey (2.3%), Low Sodium SOY Sauce (2%), Garlic (1%), Chilli Flakes (0.73%), Basmati Rice (45.9%), Spring onions (1.6%)." },
            allergens: { allergens: "Gluten, Molluscs, Soy." },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id12.id
        },
        {
            name: "THAI GREEN CURRY WITH CAULIFLOWER RICE",
            image: "Thai-Green-Curry-with-Cauliflower-Rice_1120x.webp",
            description: "Our famous Thai Green curry will ignite your exotic journey to superfood heaven! Awash with tantalising herbs and spices experience the wonders of the orient without leaving home!",
            ingredients: { ingredients: "Chicken, Coconut Cream, Water, Onion, Broccoli, Carrot, Capsicum, Green Curry Paste, kaffir lime peel, coriander seed, pepper, cumin, turmeric, Vegetable Oil, Garlic, Salt, Kaffir lime powder Cauliflower." },
            allergens: { allergens: "null" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id13.id
        },
        {
            name: "BUTTER CHICKEN & BASMATI RICE",
            image: "ButterChickenWorkoutMeals_1120x.jpg",
            description: "A creamy and scrumptious dish loaded rich in protein chicken promotes excellent brain function and keeps the immune system strong. An excellent source of Vitamin B6 and B12!  This meal also reduces appetite and hunger levels whilst boosting your metabolism.",
            ingredients: { ingredients: "Chicken Breast 36%g, Basmati Rice Pea & Corn 36%, Butter chicken Sauce (Butter Chicken Mix, Ghee, Brown onion, ginger, Garlic, Tomato Puree, Sugar brown, Thickened Cream, Butter Unsalted, Paprika sweet, Turmeric, Cumin, Salt, Chicken Stock, Food Colouring, Tomato Paste, Cashew Paste, Fenugreek leaves, Chilli powder, Garam Masala) 27%. " },
            allergens: { allergens: "Dairy, Tree nut" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id14.id
        },
        {
            name: "BLACK PEPPER BEEF, PICKLED CABBAGE & VEGGIE FRIED RICE",
            image: "BlackPepperBeef_1120x.jpg",
            description: "Tge pepper make you eat more!",
            ingredients: { ingredients: "Black Pepper Beef (50%) [Beef (70%), Black Pepper Sauce (30%) [Water (53.1%), Oyster Sauce (26.5%), Low Sodium SOY Sauce (13.3%) (WHEAT), Corn Flour (3.2%) [Cornflour], Sugar (2.7%), White Pepper (1.3%) [Pepper]]], Brown Veggie Fried Rice (33.3%) [Brown Rice (60.3%), Carrots (9%), Bean Sprouts (9%), Broccoli Rice (9%) [Broccoli, Shallot, Garlic, Lemon Juice], Fried Rice Dressing (7.5%) [Oyster Sauce (52.6%), SESAME Oil (28.6%), Low Sodium SOY Sauce (10.5%) (WHEAT), Garlic (7.9%), Olive Oil (0.44%)], Shallot (5.1%)], Sour Cabbage (16.7%) [Cabbage (54.3%), Rice Vinegar (24.4%), Ginger (10.9%), Olive Oil (5.8%), Brown Sugar (2.7%), Low Sodium SOY Sauce (1.1%) (WHEAT), Mustard Seed, Yellow (0.27%), Fennel Seeds (0.27%), Chinese Five Spice (0.27%)]" },
            allergens: { allergens: "Soy, Wheat, Sesame" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id15.id
        },
        {
            name: "MOROCCAN MEATBALLS & COUS COUS",
            image: "MoroccanMeatballsWorkoutMeals_1120x.jpg",
            description: "A delectable classic with Beef Meatballs with a Moroccan Style sauce served with Roasted pumpkin and Couscous.",
            ingredients: { ingredients: "Moroccan Sauce [Roasted Capsicum [Red Peppers (60%), Water, Vinegar, Salt, Sugar], Passata [Tomato, Acidity regulator (330)], Diced Onion, Water, Canola Oil, Tomato Paste [Tomato Paste, Acidity regulator (330)], Crushed Garlic [Garlic, Salt], Corn Starch, Salt, Coriander, Ground Coriander, Ground Cumin, Smoked Paprika, Caraway Seeds, Ground Black Pepper, Preservative (234) [Nisin, Sodium chloride]], SUB4034 Couscous Cooked [Couscous [Durum Wheat Semolina, Water], Water, Canola Oil, Salt, Ground Black Pepper], SUB1003 Beef & Oregano Meatballs Cooked [Meatballs [Beef, Water, Onion, Rice Flour, Vegetable Fibre (460), Salt, Dextrose, Vegetable Powders, Pea Protein, Acidity Regulator (331), Vegetable Gums (407, 415), Yeast Extract, Hydrolysed Vegetable Protein (Maize), Gluten Free Breadcrumbs [rice Flour, Maize Flour, Mineral Salts 450, 500], Dried Oregano, Herbs And Spices]], SUB3004 Roasted Pumpkin 30mm Skin On [Pumpkin Diced 3x3, Canola Oil, Salt, Ground Black Pepper], SUB3033 Roasted Chickpeas [Chickpeas [Chickpeas (60%), Water, Salt], Canola Oil, Salt, Cracked Black Pepper]" },
            allergens: { allergens: "Gluten" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id16.id
        },
        {
            name: "BEEF BOLOGNESE & PASTA",
            image: "Beef-Bolognese-_-Pasta_1120x.webp",
            description: "Experience a heavenly journey to Bella Roma with our flavoursome beef bolognese dish straight from Nonna's kitchen chockfull of tasty goodness and healthy life-enhancing good fats!",
            ingredients: { ingredients: "Pasta (50%), Bolognese (50%), Carrots (10%), Onions (6.7%), Olive Oil (3.3%), White Pepper (0.47%), Salt (0.4%), Italian Herbs (0.27%)." },
            allergens: { allergens: "Gluten" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id17.id
        },
        {
            name: "BEEF HOKKIEN NOODLES",
            image: "beef-hokkien-noodles_1120x.jpg",
            description: "Beef Hokkien Noodles with sesame.",
            ingredients: { ingredients: "Ingredients: Beef (40%), Hokkien Noodle (24%) (Wheat Flour, Water, Vegetable Oil, Salt, Colours (102, 110)), Onion (13%), Capsicum (13%), Ginger (4%), Garlic (2%), Rice Malt Syrup (2%), Olive Oil (1%), Tamari Sauce (SOY), Sesame Seeds (SESAME). " },
            allergens: { allergens: "Soy, Wheat, Sesame" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id18.id
        },
        {
            name: "PEPPERCORN STEAK & CHIPS",
            image: "ScreenShot2021-05-24at12.14.12pm.webp",
            description: "Celebrate everything great about classic Aussie pub meals without the calorific overload. We have re-created this classic traditional dish using organic condiments to add extra zest and relish to an already epic meal combination.",
            ingredients: { ingredients: "White Potato Chips (43.7%), Beef (43.7%), Water, Cream, Pink Pepper, Green Pepper, Spices, Canola Oil, Dijon Mustard, Onion, Garlic, Green Peas." },
            allergens: { allergens: "Dairy" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id19.id
        },
        {
            name: "THYME LEMON CHICKEN & PUMPKIN PUREE",
            image: "ThymeLemonChicken_PumpkinPureeWorkoutMeals_1120x.webp",
            description: "Moroccan Chicken with cauliflower rice",
            ingredients: { ingredients: "Chicken Tenderloin (36%), Pumpkin (30%), Chicken Stock ((12%) Water, Chicken, Carrots, Celery, Cabbage, Onions, Parsley, Sage Extract, Natural Antioxidant (Rosemary Extract), Sugar, Salt, Glucose, Yeast Extract), Green Peas (15%), Butter (Milk), Thickened Cream (Milk), Vegetable Oil (Soybean), Vegetable Stock Powder, Lemon Juice (1.40%), Corn Flour Wheaten (Wheat), Water, Salt, Sugar, Thyme (0.04%), Garlic Crushed, White Pepper." },
            allergens: { allergens: "Milk, Wheat." },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id20.id
        },
        {
            name: "MONGOLIAN BEEF WITH BROWN RICE",
            image: "MongolianBeef_1120x.webp",
            description: "Visit the orient and experience our mouthwatering and tantalising Mongolian beef dish crammed with zesty herbs and spices to ignite the senses.",
            ingredients: { ingredients: "Beef (68.4%), Brown Rice (19%), Soy sauce (3%), Rice Vinegar (2.3%), Hoisin Sauce (2.3%), Olive Oil (1.6%), Garlic minced (1.5%), Cornstarch (0.76%), Spring Onion Raw (0.76%), Sesame seeds (0.3%)." },
            allergens: { allergens: "Wheat, Soy, Sesame." },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id21.id
        },
        {
            name: "ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES",
            image: "AsianChickenStirFryWorkoutMeals_1120x.jpg",
            description: "A delectable classic with Asian Chicken Stir Fry & Hokkien Noodles!",
            ingredients: { ingredients: "Water, Higher Welfare Chicken (18%), Hokkien Noodles (17%) [Wheat Flour, Water, Gluten, Salt, Mineral salts (500, 501, 341), Vegetable oil (Canola oil), Natural Colour (160b), Preservative (202)], Roasted Red Capsicum (10%) (Red Peppers, Water, Vinegar, Salt, Sugar), Wombok (7%), Red Onion (6%), Soy Sauce (6%) (Soy Bean, Wheat, Salt, Water), Bean Cross Cut (4%), Demerara Sugar (3.5%), Ginger Crushed (1%) (Acidity Regulator (270)), Canola Oil, Garlic Minced, Corn Starch, White Sesame Seeds, Salt, Black Pepper" },
            allergens: { allergens: "Gluten, Wheat, Sesame,Soy" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id22.id
        },
        {
            name: "CHICKEN & CHORIZO PAELLA",
            image: "ChickenChrizoWorkoutMeals_1120x.jpg",
            description: "A delectable classic with traditional Spanish style Paella with Australian chicken, chorizo and mixed vegetables.",
            ingredients: { ingredients: "Cooked Long Grain Rice (35%) (Long Grain Rice, Water), Chicken Breast(22%), Water, Chorizo (9%) [Pork, Salt, Modified Starch (1412), Spices,Corn Syrup Solids, Garlic, Wheat Fibre, Mineral Salt (451), Antioxidant(316), Preservative (250). Wood Smoked], Onion, Peas, Carrots, Celery, Fire Roasted Capsicum, Vegetable Oil, Chicken Style Stock Powder, Corn Starch, Crushed Garlic, Cajun Spice [Anticaking Agent (551), Colour (160a)],Paprika Powder, Turmeric, Cumin, Cracked Black Pepper." },
            allergens: { allergens: "Gluten, Milk, Soy" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id23.id
        },
        {
            name: "PERI PERI CHICKEN & VEG",
            image: "PeriPeriChickenLowcarbWorkoutMeals_1120x.jpg",
            description: "Peri Peri Chicken & Vegetables",
            ingredients: { ingredients: "Chicken Breast (50%), Broccoli (20%), Green Beans (16%), Carrot (14%)" },
            allergens: { allergens: "null" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id24.id
        },
        {
            name: "TURKEY MINCE POKE BOWL",
            image: "pokebowl_1120x.webp",
            description: "You don’t need to be a hipster to enjoy our Turkey Poke Bowl! This the dish is loaded with good fats to support muscle strength and growth. You will love the Star Power of this deconstructed Poke, an all-year-round, health-orientated wonder meal.",
            ingredients: { ingredients: "Vermicelli rice noodles (53.8%), Turkey San Choy Bao (44.6%), Onion, Garlic, Soy Sauce, Chilli, Honey, Lemon Juice, Wombok, Carrots, Mint, Coriander, Crushed Peanuts, Spring Onion Raw (1.5%)." },
            allergens: { allergens: "Peanuts, Sesame, Soy, Tree nuts." },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id25.id
        },
        {
            name: "BBQ GRILLED CHICKEN & SWEET POTATO",
            image: "0Z8FfSmw_1120x.jpg",
            description: "Savour this tantalising and zesty dish packed with delicious superfoods and loaded with hearty good fats.",
            ingredients: { ingredients: "Plain Sweet Potato Mash (50%) [sweet potato, olive oil, salt, pepper], Chicken (41.7%) [Chicken Breast], BBQ Sauce (8.3%) [Tomatoes (from Paste, Food Acid (Citric)) 45%, Sugar, Water, Cornflour (from WHEAT), Food Acids (Acetic, Citric), Salt, Glucose Syrup, Colour (Caramel (150c)), Thickener (Pectin), Tamarind Paste, Yeast Extract, Clove, Nutmeg, Onion 0.5%, Pepper]" },
            allergens: { allergens: "Gluten" },
            preparation: "From Fresh: Remove cardboard sleeve; Microwave for 1 ½ - 2 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY!|| From Frozen: Remove cardboard sleeve; Microwave for 3 - 5 mins ;Let the meal stand for 30 / 40 seconds ;Remove the film and ENJOY! ",
            food_type_id: food_type_id26.id
        },
    ])

    console.log("insert into foods complete");

}