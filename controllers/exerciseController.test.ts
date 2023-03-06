import { Request, Response } from "express";
import { ExerciseService } from "../services/exerciseService";
import { ExerciseController } from "./exerciseController";
import { UserService } from "../services/userService";

describe('ExerciseController', () => {
    let exerciseService: ExerciseService;
    let exerciseController: ExerciseController;
    let req: Request;
    let res: Response;
    let fakeExercise: any;  // interface to be provided
    beforeEach(() => {
        // Step 1: Prepare the data and mock  [Arrange]
        exerciseService = new ExerciseService({} as any);
        fakeExercise = {
            id: 1,
            name: "ex1",
            level: "high",
            calories: 0.5,
            details: "ex1's details'",
            thumbnail: "ex1.jpg",
            sample_video: "ex1.mp4"
        }
        exerciseService.getAllExercises = jest.fn(
            async( queriesLength: number, queries: any ) => [fakeExercise]
        );
        exerciseService.getOneExercise = jest.fn(
            async( exercise_id: number ) => {}
        );
        exerciseService.completedExercise = jest.fn(
            async( user_id:number, exercise_id:number, repetitions:number ) => {}
        );

    })

    it('should get all exercises', async() => {
        // step 2: call the method
		await exerciseController.getAllExercises(req, res);

		// Step 3: expectation
		expect(exerciseService.getAllExercises).toBeCalledTimes(1)
		expect(res.json).toBeCalledWith({
			data: [fakeExercise],
			message: 'Get exercises success'
		})
    })

    // it('should fail to get exercises', async() => {
    //     // Step 1: re-assign and override getAllExercises() implementation
	// 	exerciseService.getAllExercises = jest.fn(() => {
	// 		throw new Error('Failed to get exercises')
	// 	})

    //     // step 2: call the method
	// 	await exerciseController.getAllExercises(req, res)

	// 	// Step 3: expectation
	// 	expect(memoService.getMemos).toBeCalledTimes(1)
	// 	expect(res.status).toBeCalledWith(500)
	// 	let res2 = res.status(500)
	// 	expect(res2.json).toBeCalledWith({
	// 		message: '[MEM001] - Server error'
	// 	})

    // })

});