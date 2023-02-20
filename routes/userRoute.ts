import express from "express";
import { userController } from "../server";

export function makeUserRoutes() {
	const userRoutes = express.Router();

    userRoutes.get('/login/google', userController.loginGoogle);
	userRoutes.get('/login', userController.login);
	userRoutes.get('/logout', userController.logout);
    userRoutes.post('/signup', userController.signUp);
    userRoutes.put('/password', userController.changePassword);
    userRoutes.put('/icon', userController.changeIcon);
    userRoutes.delete('/', userController.deleteUser);

	return userRoutes;
}