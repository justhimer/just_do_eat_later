import type {Knex} from 'knex'

export class TransactionService {

    constructor(private knex:Knex){}

    async addCalories (user_id:number,exercise_id:number,calories:number){
        
    }

    async removeCalcories (id:number,calories:number){

    }

}