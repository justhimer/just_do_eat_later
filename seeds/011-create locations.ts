import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries


    await knex("locations").insert([
        {
            title: "Pure Fitness Causeway Bay",
            address: "15/F Lee Theatre, 99 Percival St, Causeway Bay",
            point: "22.278299, 114.183107",
            description: "位於利舞臺，嶄新設計令人耳目一新，頂尖器材一應俱全，更設有所有分店中面積最大的拳擊訓練專區。Pure Fitness每星期提供60多個課堂逾20項健身班選擇，由私人健身教練為顧客度身設計鍛鍊計劃，並免費提供Wi-Fi、運動服及沐浴用品等服務。",
        },
        {
            title: "Pure Fitness Central",
            address: "18/F California Tower 32 D'Aguilar Street, Central",
            point: "22.280926, 114.155475",
            description: "nood food juice bar serving superfood smoothies, cold-pressed juices and raw food fix"
        },
        {
            title: "Pure Fitness TST",
            address: "Shop 611 & Shop 711, Level 6 & Level 7, K11 MUSEA Victoria Dockside, 18 Salisbury Rd, Tsim Sha Tsui",
            point: "22.293437, 114.174040",
            description: "The biggest PURE Fitness in the world"
        }
    ])

}