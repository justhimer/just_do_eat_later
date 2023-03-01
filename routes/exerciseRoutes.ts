import express, { Express } from "express";
import { exerciseController } from "../server";

export function chooseexerciseRoutes() {
    const exerciseRoutes = express.Router();

    exerciseRoutes.get('/allExercise', exerciseController.getAllExercise)
    exerciseRoutes.post('/addExercise', exerciseController.addExercise)
    exerciseRoutes.post('/removeExercise', exerciseController.removeExercise)
    exerciseRoutes.get('/countCalorise', exerciseController.countCalorise)

    return exerciseRoutes;
}