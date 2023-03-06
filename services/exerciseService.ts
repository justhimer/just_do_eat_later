import type { Knex } from "knex";
import { ExerciseDetails } from '../util/interfaces'

export class ExerciseService {

    constructor(private knex: Knex) { }

    async getAllExercises(queriesLength: number, queries: any): Promise<any> {

        let sqlParameters = [];
        let sqlString = `
            select
            ex.id,
            ex.name,
            int.level,
            ex.calories,
            ex.details,
            ex.thumbnail,
            ex.sample_video
            from exercises as ex
            join intensities as int on ex.intensity_id = int.id 
        `;

        if (queriesLength > 0) {
            sqlString += "where ";
            for (let key in queries) {
                if (queries[key]) {
                    if (sqlParameters.length > 0) { sqlString += "and " }
                    sqlParameters.push(queries[key]);
                    sqlString += `${key} = ?`;
                }
            }
        }   

        const allExercises = await this.knex.raw(sqlString, sqlParameters);

        return allExercises.rows;
    }

    // async getDistinctTypes(): Promise<any> {
    //     let allTypes = await this.knex
    //         .distinct()
    //         .from('exercise')
    //         .pluck('name')

    //     return allTypes
    // }

    async getOneExercise(exercise_id: number): Promise<any>{
        let exercise = await this.knex.select(
            'ex.id',
            'ex.name',
            'int.level',
            'ex.calories',
            'ex.details',
            'ex.thumbnail',
            'ex.sample_video'
          )
          .from('exercises as ex')
          .join('intensities as int', 'ex.intensity_id', 'int.id')
          .where('ex.id', exercise_id)
          .first();
    
        return exercise;
    }

    async completedExercise(user_id:number,exercise_id:number,repetitions:number) {
        const txn = await this.knex.transaction()
        let exerciseCalorie = (await this.knex()
        .select('calories')
        .from('exercises')
        .where('id',exercise_id)
        .first()).calories
        let totalCalories = exerciseCalorie*repetitions

        try {
            let ex_his_id = await txn
            .insert({
                user_id:user_id,
                exercise_id:exercise_id,
                repetitions:repetitions,
                calories_burn:totalCalories
            })
            .into('exercises_history')
            .returning('id')

            console.log(ex_his_id[0]['id'])

            await txn
            .insert({
                user_id:user_id,
                method:"plus",
                calories:totalCalories,
                description:"calorie from exercise",
                exercises_history_id:ex_his_id[0]['id'],
                promotion:false
            })
            .into('calorie_change')

            await txn.commit()
            return
        } catch (error) {
            console.log('exerciseService.completedExercise error: ',error)
            await txn.rollback();
            return;
        }
       
    }
}