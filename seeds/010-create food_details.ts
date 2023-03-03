import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries


    let foods = await knex.select('id').from('foods');

    let food_id = foods[0]
    let food_id1 = foods[0]
    let food_id2 = foods[1]
    let food_id3 = foods[1]
    let food_id4 = foods[2]
    let food_id5 = foods[2]
    let food_id6 = foods[3]
    let food_id7 = foods[3]
    let food_id8 = foods[4]
    let food_id9 = foods[4]
    let food_id10 = foods[5]
    let food_id11 = foods[6]
    let food_id12 = foods[7]
    let food_id13 = foods[8]
    let food_id14 = foods[9]
    let food_id15 = foods[10]
    let food_id16 = foods[11]
    let food_id17 = foods[11]
    let food_id18 = foods[12]
    let food_id19 = foods[12]
    let food_id20 = foods[13]
    let food_id21 = foods[14]
    let food_id22 = foods[14]
    let food_id23 = foods[15]
    let food_id24 = foods[16]
    let food_id25 = foods[16]
    let food_id26 = foods[16]
    let food_id27 = foods[17]
    let food_id28 = foods[18]
    let food_id29 = foods[19]
    let food_id30 = foods[20]
    let food_id31 = foods[20]
    let food_id32 = foods[21]
    let food_id33 = foods[22]
    let food_id34 = foods[23]
    let food_id35 = foods[24]
    let food_id36 = foods[24]
    let food_id37 = foods[25]
    let food_id38 = foods[25]


    console.log('foods', foods);

    console.log("food_id", food_id)


    await knex("food_details").insert([
        {
            portion: "Regular",
            food_id: food_id.id,
            calories: 536
        },
        {
            portion: "Large",
            food_id: food_id1.id,
            calories: 714
        },
        {
            portion: "Regular",
            food_id: food_id2.id,
            calories: 406
        },
        {
            portion: "Large",
            food_id: food_id3.id,
            calories: 570
        },
        {
            portion: "Regular",
            food_id: food_id4.id,
            calories: 290
        },
        {
            portion: "Large",
            food_id: food_id5.id,
            calories: 407
        },
        {
            portion: "Regular",
            food_id: food_id6.id,
            calories: 478
        },
        {
            portion: "Large",
            food_id: food_id7.id,
            calories: 633
        },
        {
            portion: "Regular",
            food_id: food_id8.id,
            calories: 353
        },
        {
            portion: "Large",
            food_id: food_id9.id,
            calories: 478
        },
        {
            portion: "Regular",
            food_id: food_id10.id,
            calories: 675
        },
        {
            portion: "Regular",
            food_id: food_id11.id,
            calories: 419
        },
        {
            portion: "Regular",
            food_id: food_id12.id,
            calories: 409

        },
        {
            portion: "Regular",
            food_id: food_id13.id,
            calories: 435
        },
        {
            portion: "Regular",
            food_id: food_id14.id,
            calories: 438
        },
        {
            portion: "Regular",
            food_id: food_id15.id,
            calories: 333
        },
        {
            portion: "Regular",
            food_id: food_id16.id,
            calories: 367
        },
        {
            portion: "Large",
            food_id: food_id17.id,
            calories: 490
        },
        {
            portion: "Regular",
            food_id: food_id18.id,
            calories: 244
        },
        {
            portion: "Large",
            food_id: food_id19.id,
            calories: 332
        },
        {
            portion: "Regular",
            food_id: food_id20.id,
            calories: 475
        },
        {
            portion: "Regular",
            food_id: food_id21.id,
            calories: 340
        },
        {
            portion: "Large",
            food_id: food_id22.id,
            calories: 452
        },
        {
            portion: "Regular",
            food_id: food_id23.id,
            calories: 689

        },
        {
            portion: "Regular",
            food_id: food_id24.id,
            calories: 663
        },
        {
            portion: "Large",
            food_id: food_id25.id,
            calories: 884
        },
        {
            portion: "Regular",
            food_id: food_id26.id,
            calories: 435
        },
        {
            portion: "Regular",
            food_id: food_id27.id,
            calories: 260
        },
        {
            portion: "Large",
            food_id: food_id28.id,
            calories: 344
        },
        {
            portion: "Regular",
            food_id: food_id29.id,
            calories: 316
        },
        {
            portion: "Regular",
            food_id: food_id30.id,
            calories: 437
        },
        {
            portion: "Large",
            food_id: food_id31.id,
            calories: 538
        },
        {
            portion: "Regular",
            food_id: food_id32.id,
            calories: 513
        },
        {
            portion: "Regular",
            food_id: food_id33.id,
            calories: 563
        },
        {
            portion: "Regular",
            food_id: food_id34.id,
            calories: 242
        },
        {
            portion: "Regular",
            food_id: food_id35.id,
            calories: 403

        },
        {
            portion: "Large",
            food_id: food_id36.id,
            calories: 555
        },
        {
            portion: "Regular",
            food_id: food_id37.id,
            calories: 318
        },
        {
            portion: "Large",
            food_id: food_id38.id,
            calories: 425
        },

    ])
}