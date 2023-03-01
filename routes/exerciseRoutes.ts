import express, { Express } from "express";
import { exerciseController } from "../server";

export function chooseexerciseRoutes() {
    const exerciseRoutes = express.Router();

    exerciseRoutes.get('/allExercise', exerciseController.getAllExercise)

    return exerciseRoutes;
}