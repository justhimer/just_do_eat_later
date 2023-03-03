import type { Knex } from "knex";
import { exerciseDetails } from '../util/interfaces'

export class ExerciseService {

    constructor(private knex: Knex) { }

    async getAllExercises(): Promise<any> {
        let allExercises = await this.knex.raw(`
        select
        ex.id,
        ex.name,
        int.level,
        ex.calories,
        ex.details,
        ex.thumbnail,
        ex.sample_video
        from exercises as ex
        join intensities as int on ex.intensity_id = int.id;`);
        return allExercises.rows;
    }

    // async getDistinctTypes(): Promise<any> {
    //     let allTypes = await this.knex
    //         .distinct()
    //         .from('exercise')
    //         .pluck('name')

    //     return allTypes
    // }

    async getExercise(exercise_id:number): Promise<any>{
        let exercise = await this.knex()
        .select('*')
        .from('exercises')
        .where('id',exercise_id)
        .first();
    
        return exercise;
    }

    async completedExercise(user_id:number,exercise_id:number,repetitions:number) {
        let exerciseCalorie = (await this.knex()
        .select('calories')
        .from('exercises')
        .where('id',exercise_id)
        .first()).calories
        let totalCalories = exerciseCalorie*repetitions
        console.log('totalCalories: ',totalCalories)
        await this.knex()
        .insert({
            user_id:user_id,
            exercise_id:exercise_id,
            repetitions:repetitions,
            calories_burn:totalCalories
        })
        .into('exercises_history')
    }
}