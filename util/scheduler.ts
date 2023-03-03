import * as schedule from "node-schedule"
import { knex } from "./db";
import { userService } from "../server";

export const emitTime = new schedule.RecurrenceRule();
emitTime.dayOfWeek = [0,new schedule.Range(0,6)];
emitTime.hour = 0;
emitTime.minute = 0

export const testTime = new schedule.RecurrenceRule();
testTime.dayOfWeek = [0,new schedule.Range(0,6)];
testTime.minute = [0,new schedule.Range(0,59)];

export async function dailyPointDistribution(){
    console.log('inserting into calorie_change')
    let users = await knex.select('id')
    .from('users')
    .where('subscribed',true)

    users.forEach(async (element)=>{
        await knex
        .insert({
            user_id:element.id,
            method:"plus",
            calories:"200",
            description:"daily calorie add",
            promotion:false
        })
        .into('calorie_change')


        console.log(`calculating points for user ${element.id}`)
        await userService.calcCalories(element.id)
    })
    
    return 
}