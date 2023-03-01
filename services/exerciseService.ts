import type { Knex } from "knex";
import { exerciseDetails } from '../util/interfaces'

export class ExerciseService {

    constructor(private knex: Knex) { }

    async getAllExercise(): Promise<any> {
        let allExercise = await this.knex.raw(`
        select exercise.id as id, exercises."name" as name, intenstiy_id as id, exercise_history.id as id, exercise_history.repetitions as repetitions, exercise_history.calorise_burn as calorise_burn
        from exercise
        inner join exercise_history
        on exercise_history.exercise_id = id
        `)

        return allExercise
    }

    async getDistinctTypes(): Promise<any> {
        let allTypes = await this.knex
            .distinct()
            .from('exercise')
            .pluck('name')

        return allTypes
    }

    async addItem(id: number): Promise<any> {
        await this.knex()
            .where({
                user_id: id,
                exercise: id,
                intensity_id: id,
            })

    }

    async deleteItem(id: number): Promise<any> {
        await this.knex()
            .where({
                user_id: id,
                exercise: id,
                intensity_id: id,
            })
            .del()
    }

    async countCalorise(id: number): Promise<any> {
        await this.knex()
            .select('exercise')
            .where({
                exercise_id: id,

            })
    }
}