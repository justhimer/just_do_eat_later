import { Request, Response } from "express";
import { ExerciseService } from "../services/exerciseService";
import { ExerciseController } from "./exerciseController";
import { createRequestWithSession, createEmptyRequest, createEmptyResponse } from "../util/test-helper";
import { UserService } from "../services/userService";

describe('ExerciseController', () => {
    let exerciseService: ExerciseService;
    let userService: UserService;
    let exerciseController: ExerciseController;
    let req: Request;
    let reqS: Request;
    let res: Response;
    let fakeExercise: any;  // interface to be provided
    let fakeCalories: any;  // interface to be provided
    beforeEach(() => {
        // Step 1: Prepare the data and mock  [Arrange]

        // fake data
        exerciseService = new ExerciseService({} as any);
        userService = new UserService({} as any);
        fakeExercise = {
            id: 1,
            name: "ex1",
            level: "high",
            calories: 0.5,
            details: "ex1's details'",
            thumbnail: "ex1.jpg",
            sample_video: "ex1.mp4"
        }
        fakeCalories = { calories: 2.2 }
        req = createEmptyRequest();
        reqS = createRequestWithSession();
        res = createEmptyResponse();

        // fake functions
        exerciseService.getAllExercises = jest.fn(
            async( queriesLength: number, queries: any ) => [fakeExercise]
        );
        exerciseService.getOneExercise = jest.fn(
            async( exercise_id: number ) => fakeExercise
        );
        exerciseService.completedExercise = jest.fn(
            async( user_id:number, exercise_id:number, repetitions:number ) => {}
        );
        userService.calcCalories = jest.fn(
            async( id :number ) => {}
        );
        exerciseController = new ExerciseController(exerciseService, userService);

    })

    it('get all exercises', async() => {
        // call the method
		await exerciseController.getAllExercises(req, res);

		// expectation
		expect(exerciseService.getAllExercises).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(200);
		expect(res.status(200).json).toBeCalledWith({
			data: [fakeExercise],
			message: 'Get exercises success'
		});
    });

    it('fail to get all exercises', async() => {
        // re-assign and override getAllExercises() implementation
		exerciseService.getAllExercises = jest.fn(() => {
			throw new Error('Failed to get exercises')
		})

        // call the method
		await exerciseController.getAllExercises(req, res)

		// expectation
		expect(exerciseService.getAllExercises).toBeCalledTimes(1)
		expect(res.status).toBeCalledWith(500);
		expect(res.status(500).json).toBeCalledWith({
			message: '[EXE001] - Server error'
		});
    });

    it('get one exercise', async() => {
        // call the method
		await exerciseController.getOneExercise(req, res);

		// expectation
		expect(exerciseService.getOneExercise).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(200);
		expect(res.status(200).json).toBeCalledWith({
			data: fakeExercise,
			message: 'Get exercise success'
		});
    });

    it('fail to get one exercise', async() => {
        // re-assign and override getAllExercises() implementation
		exerciseService.getOneExercise = jest.fn(() => {
			throw new Error('Failed to get exercise')
		})

        // call the method
		await exerciseController.getOneExercise(req, res);

		// expectation
		expect(exerciseService.getOneExercise).toBeCalledTimes(1)
		expect(res.status).toBeCalledWith(500)
		expect(res.status(500).json).toBeCalledWith({
			message: '[EXE002] - Server error'
		});
    });

    it('complete an exercise with session', async() => {
        // call the method
		await exerciseController.completedExercise(reqS, res);

		// expectation
		expect(exerciseService.completedExercise).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(200);
		expect(res.status(200).json).toBeCalledWith({
			message: 'success'
		});
    });

    it('complete an exercise without session', async() => {
        // call the method
		await exerciseController.completedExercise(req, res);

		// expectation
		expect(exerciseService.completedExercise).toBeCalledTimes(0)
        expect(res.status).toBeCalledWith(500);
		expect(res.status(500).json).toBeCalledWith({
			message: '[EXE003] - Server error'
		});
    });

});