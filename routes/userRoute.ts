import express from "express";
import { userController } from "../server";
import { isLoggedIn } from "../util/guard";

export function makeUserRoutes() {
	const userRoutes = express.Router();

    userRoutes.get('/login/google', userController.loginGoogle);
	userRoutes.post('/login', userController.login);
	userRoutes.get('/logout', userController.logout);
    userRoutes.post('/signup', userController.signUp);
    userRoutes.put('/googleContinue',isLoggedIn,userController.googleContinue)
    userRoutes.put('/icon', isLoggedIn,userController.changeIcon);
    userRoutes.delete('/', isLoggedIn,userController.deleteUser);
    userRoutes.put('/updateAccount',isLoggedIn,userController.updateAccount)
    userRoutes.put('/updatePersonal',isLoggedIn,userController.updatePersonal)
    userRoutes.put('/updateBody',isLoggedIn,userController.updateBody)
    userRoutes.get('/userDetails',isLoggedIn,userController.getDetails)
    userRoutes.put('/updateImg',isLoggedIn,userController.updateImg)
    userRoutes.get('/loginStatus',userController.loginStatus)
    userRoutes.get('/calories',isLoggedIn,userController.getCalories)

	return userRoutes;
}