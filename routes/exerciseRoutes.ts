import express, { Express } from "express";
import { exerciseController } from "../server";
import { isLoggedIn } from "../util/guard";

export function chooseexerciseRoutes() {
    const exerciseRoutes = express.Router();

    exerciseRoutes.get('/all', exerciseController.getAllExercises)
    exerciseRoutes.get('/one/:exercise_id',exerciseController.getOneExercise)
    exerciseRoutes.post('/completeExercise',isLoggedIn,exerciseController.completedExercise)

    return exerciseRoutes;
}