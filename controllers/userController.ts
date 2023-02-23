import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { checkPassword } from "../util/hash";
import { knex } from "../util/db";
import { formidableUserDetails } from "../util/formidable";


export class UserController {

    constructor(private userService: UserService) { }

    loginGoogle = async (req: Request, res: Response) => {
        try {
            // add codes here
            console.log(req.session?.['grant'].response)
            console.log("loading google login");
            
        } catch (error) {
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }

    login = async (req: Request, res: Response) => {
        try {

            // get username & password
            let { email, password } = req.body;
            if (!email || !password) {
                res.status(402).json({ message: 'Invalid input' });
                return;
            }

            // get user's info from userService
            let foundUser = await this.userService.getUserByEmail(email)

            // check if user exists
            if (!foundUser) {
                res.status(402).json({ message: 'Invalid email' });
                return;
            }

            // check if password matches
            let isPasswordValid = await checkPassword(
                password,
                foundUser.password!
            )
            if (!isPasswordValid) {
                res.status(402).json({ message: '[USR001] - Invalid password' });
                return;
            }

            // save to session without password
            delete foundUser.password;
            req.session.user = foundUser;

            // return to client
            res.status(200).json({ message: "Log-in success" });

        } catch (error) {
            res.status(500).json({
                message: '[USR001] - Server error'
            });
        }
    }

    logout = async (req: Request, res: Response) => {
        try {

            delete req.session.user;
            res.json({ message: "log-out success" });

        } catch (error) {
            res.status(500).json({
                message: '[USR002] - Server error'
            });
        }
    }

    signUp = async (req: Request, res: Response) => {
        try {
            if (!req.session.user){
                let data = await formidableUserDetails(req)
                const reqData = data.fields
                let user = await this.userService.createUser(reqData,data.icon)
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    password: user.password,
                    icon: user.icon
                }
                console.log(req.session.user)
                res.status(200).json({message:"Logged in"})
            }else{res.status(400).json({message:"Already logged in"})}
        } catch (error) {
            res.status(500).json({
                message: '[USR004] - Server error'
            });
        }
    }

    changePassword = async (req: Request, res: Response) => {
        try {
            // add codes here
        } catch (error) {
            res.status(500).json({
                message: '[USR005] - Server error'
            });
        }
    }

    changeIcon = async (req: Request, res: Response) => {
        try {
            // add codes here
        } catch (error) {
            res.status(500).json({
                message: '[USR006] - Server error'
            });
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            // add codes here
        } catch (error) {
            res.status(500).json({
                message: '[USR007] - Server error'
            });
        }
    }

}