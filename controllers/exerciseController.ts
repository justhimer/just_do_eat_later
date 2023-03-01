import { Request, Response } from "express";
import { ExerciseService } from "../services/exerciseService";
import { knex } from "../util/db";



export class ExerciseController {


    constructor(
        private exerciseService: ExerciseService,
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

    
}
