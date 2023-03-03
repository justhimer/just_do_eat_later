import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes All existing ebtries
    await knex("exercises").del();

    let intensity_id = await knex.select('id').from('intensities');
    console.log({ intensity_id });


    // Inserts seed enteries
    await knex("exercises").insert([
        {
            name: "push up",
            intensity_id: intensity_id[1].id,
            calories: 0.38,
            details: "Push-ups are a classic bodyweight exercise that build upper body strength and muscle endurance. They require no equipment, can be modified, and are highly effective.",
            thumbnail: "push_up.jpg",
            sample_video: "push_up_1.mp4"
        },
        {
            name: "sit up",
            intensity_id: intensity_id[1].id,
            calories: 0.25,
            details: "Sit-ups are a bodyweight exercise that strengthen the abdominal muscles, improve core stability, and flexibility.",
            thumbnail: "sit_up.jpeg",
            sample_video: "sit_up_1.mp4"
        },
        {
            name: "leg raises",
            intensity_id: intensity_id[2].id,
            calories: 0.3,
            details: "Leg raises are a bodyweight exercise that strengthen the lower abdominal muscles, improve core stability, hip flexibility, and posture.",
            thumbnail: "leg_raises.jpeg",
            sample_video: "leg_raises_1.mp4"
        },
        {
            name: "lunges",
            intensity_id: intensity_id[1].id,
            calories: 0.6,
            details: "Lunges are a simple and effective exercise that target multiple muscle groups, build lower body strength, improve balance, and increase flexibility.",
            thumbnail: "lunges.png",
            sample_video: "lunges_1.mp4"
        },
        {
            name: "side jump",
            intensity_id: intensity_id[2].id,
            calories: 0.35,
            details: "Side-to-side jumps are a high-intensity plyometric exercise that improve lower body strength, power, and agility. They involve lateral jumping and can be modified.",
            thumbnail: "side_jump.jpeg",
            sample_video: "side_jump.mp4"
        },
        {
            name: "squats",
            intensity_id: intensity_id[0].id,
            calories: 0.4,
            details: "Squats are a versatile compound exercise that work multiple muscle groups, including the legs, glutes, and core. They build lower body strength, improve balance, and increase mobility.",
            thumbnail: "squat.jpg",
            sample_video: "squat_1.mp4"
        },
        {
            name: "jacks",
            intensity_id: intensity_id[0].id,
            calories: 0.2,
            details: "Jacks, or jumping jacks, are a bodyweight exercise that increase heart rate, improve cardiovascular fitness, and work multiple muscle groups.",
            thumbnail: "jacks.webp",
            sample_video: "jacks.mp4"
        }
    ])

}