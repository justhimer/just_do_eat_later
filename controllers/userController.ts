import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { checkPassword } from "../util/hash";
import { knex } from "../util/db";
import { formidableIconUpdate, formidableUserDetails } from "../util/formidable";
import fetch from 'cross-fetch'
import { hashPassword } from "../util/hash";
import {format} from "fecha";


export class UserController {

    constructor(private userService: UserService) { }

    loginGoogle = async (req: Request, res: Response) => {
        try {
            // add codes here
            const accessToken = req.session?.['grant'].response.access_token;
            const fetchRes = await (await fetch('https://www.googleapis.com/oauth2/v2/userinfo',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${accessToken}`
                }
            })).json()
            let user = (await knex
                .select('*')
                .from('users')
                .where('email','=',`${fetchRes.email}`))[0]
            
           if (!user){
            //falsy
            let userPassword = await hashPassword('google')
            let user = (await knex
                .insert({
                    first_name:`${fetchRes.given_name}`,
                    last_name:`${fetchRes.family_name}`,
                    email:`${fetchRes.email}`,
                    password:`${userPassword}`
                })
                .into("users")
                .returning("*"))[0]
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    password: user.password,
                    icon: user.icon
                }
            res.redirect('/login.html?registration=continue')
            return
           }else{
            //have user
            req.session.user = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                password: user.password,
                icon: user.icon
            }
            res.redirect('/?message=Successfully+Logged+In')
            return
           }
            
            
        } catch (error) {
            console.log(error)
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
            res.redirect('/?message=Successfully+Logged+Out');

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
                res.status(200).json({message:"Logged in"})
            }else{res.status(400).json({message:"Already logged in"})}
        } catch (error) {
            console.log(error);
            
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

    googleContinue = async (req:Request,res:Response) => {
        try{
            let reqData = req.body;
            
            let user = await this.userService.complete(reqData,req.session.user!.id);
            
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    password: user.password,
                    icon: user.icon
                };
                res.status(200).json({message:"Registration Complete"});
        }catch(error){
            res.status(500).json({
                message: '[USR007] - Server error'
            });
        }
        
    }

    loginStatus = async (req:Request, res:Response) => {
        try {
            if (req.session.user){
                res.status(200).json({login:true})
                return
            }else{
                res.status(400).json({login:false})
                return
            }
        } catch (error) {
            res.status(500).json({
                message: '[USR007] - Server error'
            });
        }
        
    }

    updateImg = async (req:Request, res:Response) => {
        try {
            let data = (await formidableIconUpdate(req)).icon;
            await this.userService.changeImg(data,req.session.user!.id);
            res.status(200).json({message:'success'});
        } catch (error) {
            res.status(500).json({
                message: '[USR007] - Server error'
            });
        }
    }

    updateAccount = async (req:Request, res:Response) => {
        try {
            await this.userService.changeAccount(req.body,req.session.user!.id)
            res.status(200).json({message: "success"})
        } catch (error) {
            res.status(500).json({
                message: '[USR007] - Server error'
            });
        }
    }

    updatePersonal = async (req:Request, res:Response) => {
        try {
            console.log('updatePersonal');
            console.log(req.body)
            await this.userService.changePersonal(req.body,req.session.user!.id)
            res.status(200).json({message: "success"})
        } catch (error) {
            res.status(500).json({
                message: '[USR007] - Server error'
            });
        }
    }

    updateBody = async (req:Request, res:Response) => {
        try {
            await this.userService.changeBody(req.body,req.session.user!.id)
            res.status(200).json({message: "success"})
        } catch (error) {
            res.status(500).json({
                message: '[USR007] - Server error'
            });
        }
    }

    getDetails = async (req:Request, res:Response) => {
        try {
            let userId = req.session.user!.id;
            let knexData = await this.userService.userDetails(userId);
            console.log('pulled data')
            console.log(knexData)
            if (!knexData.id){
                res.status(403).json({return:"invalid input"})
                return
            }else{
                let returningMessage =
                {
                    email:knexData.email,
                    password: "password",
                    icon:knexData.icon,
                    first_name:knexData.first_name,
                    last_name:knexData.last_name,
                    gender:knexData.gender,
                    dob: knexData.birth_date? format(new Date(knexData.birth_date.toLocaleDateString('en-US',{timeZone:'Asia/Hong_Kong'})), 'YYYY-MM-DD'): "",
                    height:knexData.height,
                    weight:knexData.weight
                }
                res.status(200).json(returningMessage)
                return
            }
        } catch (error) {
            console.log(error);
            
            res.status(500).json({
                message: '[USR007] - Server error'
            });
        }
    }

    getCalories =async (req: Request, res:Response) => {
        try {
            console.log("calc calories");
            
            await this.userService.calcCalories(req.session.user!.id)

            console.log('get calories')
            let knexData = await this.userService.getCalroies(req.session.user!.id)
            console.log(knexData)
            res.status(200).json(knexData)
        } catch (error) {
            console.log(error);
            
            res.status(500).json({
                message: '[USR007] - Server error'
        })
    }}
}