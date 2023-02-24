import { Knex } from "knex";




export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries
    await knex("users").del();

    await knex("users").insert([
        {
            first_name: "Messi",
            last_name: "Lionel Andrés",
            email: "messi@gamil.com",
            password: "immessi",
            icon: "messi.webp",
            calories: 3000,
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
            calories: 3000,
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
            calories: 3000,
            gender: "M",
            birth_date: "1992-02-05",
            height: 170,
            weight: 75,
        }
    ])
}