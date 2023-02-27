import express from "express";
import { userController } from "../server";

export function makeUserRoutes() {
	const userRoutes = express.Router();

    userRoutes.get('/login/google', userController.loginGoogle);
	userRoutes.post('/login', userController.login);
	userRoutes.get('/logout', userController.logout);
    userRoutes.post('/signup', userController.signUp);
    userRoutes.put('/googleContinue',userController.googleContinue)
    userRoutes.put('/icon', userController.changeIcon);
    userRoutes.delete('/', userController.deleteUser);
    userRoutes.put('/updateAccount',userController.updateAccount)
    userRoutes.put('/updatePersonal',userController.updatePersonal)
    userRoutes.put('/updateBody',userController.updateBody)
    userRoutes.get('/userDetails',userController.getDetails)
    userRoutes.put('/updateImg',userController.updateImg)
    userRoutes.get('/loginStatus',userController.loginStatus)

    userRoutes.get('/test',(req,res)=>{
        console.log(req.session.user? "there is a user logged in: ": "there is no user");
        console.log(req.session.user)
        res.status(200)
        return
    })

	return userRoutes;
}