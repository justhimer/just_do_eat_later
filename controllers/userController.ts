import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { checkPassword } from "../util/hash";

export class UserController {

    constructor(private userService: UserService) { }

    loginGoogle = async (req: Request, res: Response) => {
        try {
            // add codes here
        } catch (error) {
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }

    login = async (req: Request, res: Response) => {
        try {

            // get username & password
            let { username, password } = req.body;
            if (!username || !password) {
                res.status(402).json({ message: 'Invalid input' });
                return;
            }

            // get user's info from userService
            let foundUser = await this.userService.getUserByUsername(username)

            // check if user exists
            if (!foundUser) {
                res.status(402).json({ message: 'Invalid username' });
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
            res.json({ message: "log-in success" });

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
            // add codes here
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