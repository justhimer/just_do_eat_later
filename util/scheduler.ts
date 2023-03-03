import * as schedule from "node-schedule"

export const emitTime = new schedule.RecurrenceRule();
emitTime.dayOfWeek = [0,new schedule.Range(0,6)];
emitTime.hour = 0;
emitTime.minute = 0

export const testTime = new schedule.RecurrenceRule();
emitTime.dayOfWeek = [0,new schedule.Range(0,6)];
emitTime.minute = [0,new schedule.Range(0,59)];

export function testScheduleJob(){
    return console.log('this is testing the scheduler')
}