import express, { Express } from "express";
import { exerciseController } from "../server";
import { isLoggedIn } from "../util/guard";

export function chooseexerciseRoutes() {
    const exerciseRoutes = express.Router();

    exerciseRoutes.get('/allExercise', exerciseController.getAllExercise)
    exerciseRoutes.post('/completeExercise',isLoggedIn,exerciseController.completedExercise)

    return exerciseRoutes;
}