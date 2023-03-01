import { Request, Response } from "express";
import { ExerciseService } from "../services/exerciseService";
import { UserService } from "../services/userService";
import { knex } from "../util/db";



export class ExerciseController {


    constructor(
        private exerciseService: ExerciseService,
        private userService: UserService
    ) { }


    getAllExercise = async (req: Request, res: Response) => {
        try {
            let exercisetype = req.params.exercisetype
            console.log('exercisetype:', exercisetype)

            let knexData = await this.exerciseService.getAllExercise()
            console.log('knexData', knexData);

            let knexTypes = await this.exerciseService.getDistinctTypes()
            console.log('knexTypes', knexTypes);

            let resData = {};

            knexData.forEach((element: any) => {
                if (resData.hasOwnProperty(element.name)) {
                    resData[element.name][element.intensity] = {
                        id: element.id,
                        intensity: element.intensity
                    }
                } else {
                    resData[element.name][element.intensity] = {
                        id: element.id,
                        intensity: element.intensity
                    }
                    resData[element.name]['common'] = {
                        exercise_id: element.exercise_id,
                        name: element.name,
                        repetitions: element.repetitions,
                        calroies_burn: element.calroies_burn
                    }
                }
            });
            console.log(resData);

            res.status(200).json(resData)

        } catch (error) {
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }

    getExercise =async (req:Request, res:Response) => {
        try {
            let exercise_id = Number(req.params.exercise_id)
            let knexData = await this.exerciseService.getExercise(exercise_id)

            res.status(200).json({knexData})
        } catch (error) {
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }

    completedExercise =async (req:Request, res:Response) => {
        try {
            let {exercise_id,repetitions} = req.body
            console.log('exercise_id', exercise_id)
            console.log('repetitions', repetitions)
            console.log('exercise complete');
            
            await this.exerciseService.completedExercise(req.session.user!.id,exercise_id,repetitions)
            
            console.log('calc calories')
            await this.userService.calcCalories(req.session.user!.id)
            res.status(200).json({message:"success"})
        } catch (error) {
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }


}
