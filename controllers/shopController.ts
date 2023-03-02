import { Request, Response } from "express";
import { ShopService } from "../services/shopService";
import { checkPassword } from "../util/hash";
import { knex } from "../util/db";
import { UserService } from "../services/userService";
import { TransactionService } from "../services/transactionService";

export class ShopController {

    constructor(
        private shopService: ShopService,
        private userService: UserService,
        private transactionService: TransactionService
        ) {}


    getAllFood = async (req:Request, res:Response) => {
        try {
            
            let knexData = await this.shopService.getAllFood()
            console.log('knexData: ',knexData);
            
            // let knexTypes = await this.shopService.getDistinctTypes()
            

            let resData = {};
            
            knexData.forEach((element: any) => {
                if (resData.hasOwnProperty(element.name)){
                    resData[element.name][element.portion] = {
                        id: element.id,
                        portion: element.portion,
                        calories: element.calories
                    }
                }else {
                    resData[element.name] = {}
                    resData[element.name][element.portion] = {
                        id: element.id,
                        portion: element.portion,
                        calories: element.calories
                    }
                    resData[element.name]['common'] = {
                        food_id:element.food_id,
                        name:element.name,
                        type_id:element.type_id,
                        type:element.type,
                        image:element.image,
                        description:element.description,
                        ingredients:element.ingredients,
                        preparation:element.preparation,
                        allergens:element.allergens
                    }

                }
            });
            console.log("resData: ",resData);
            
            res.status(200).json(resData)
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }

    increaseFoodQuantity = async (req:Request, res:Response) => {
        try {
            let foodId = req.body.food_details_id;
            let foodQuantity = req.body.quantity;
            let checkItem = await this.shopService.getItemCount(req.session.user!.id, foodId)
            if (checkItem){
                await this.shopService.addItem(req.session.user!.id,foodId,foodQuantity)
                res.status(200).json({message:"Success"})
                return
            }else {
                await this.shopService.createItem(req.session.user!.id,foodId,foodQuantity)
                res.status(200).json({message:"Success"})
                return
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    decreaseFoodQuantity = async (req:Request, res:Response) => {
        try {
            let foodId = req.body.food_details_id;
            let foodQuantity = req.body.quantity;
            console.log("foodID:",foodId,"foodQuantity",foodQuantity)
            let checkItem = await this.shopService.getItemCount(req.session.user!.id, foodId)
            console.log("checkItem: ", checkItem)
            if (checkItem < foodQuantity ){
                res.status(400).json({message:"Decrease cannot be larger than quantity in shopping cart"})
            }else if (checkItem == foodQuantity){
                console.log('deleting food')
                await this.shopService.deleteItem(req.session.user!.id, foodId)
                res.status(200).json({message:"Success"})
                return
            }else{
                await this.shopService.deleteUnit(req.session.user!.id, foodId, foodQuantity)
                res.status(200).json({message:"Success"})
                return
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    removeFood = async (req:Request, res:Response) => {
        try {
            let foodId = req.body.food_details_id;
            await this.shopService.deleteItem(req.session.user!.id, foodId)
            res.status(200).json({message:"Success"})
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    deleteBasket = async (req:Request, res:Response) => {
    try {
            await this.shopService.deleteAll(req.session.user!.id)
            res.status(200).json({message:"Success"})
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    getItemCount = async (req:Request, res:Response) => {
        try {
            let foodId = req.body.food_details_id;
            let knexData = await this.shopService.getItemCount(req.session.user!.id, foodId);
            res.status(200).json(knexData)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    getTotalCount = async (req:Request, res:Response) => {
        try {
            let knexData = await this.shopService.getTotalCount(req.session.user!.id);
            res.status(200).json(knexData)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    previewBasket = async (req:Request, res:Response) => {
        try {
            let knexData = await this.shopService.getAll(req.session.user!.id);
            let knexLocation = await this.shopService.getLocations();
            let resData = {
                data:knexData,
                location:knexLocation
            }
            res.status(200).json(resData)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    confirmOrder = async (req:Request, res:Response) => {
        try {
            let location_id = req.body.location_id
            let total_calories = req.body.total_calories
            console.log("location_id: ",location_id,"total_calories: ",total_calories);
            
            let currentUserCalories = (await this.userService.getCalroies(req.session.user!.id))['calories']

            console.log("currentUserCalories: ",currentUserCalories);
            
            if (currentUserCalories - total_calories < 0){
                res.status(400).json({message:"insufficient calories to purchase meal"})
            }else {
                console.log("submitting basket");
                
                let knexData = await this.shopService.submitBasket(req.session.user!.id,location_id,total_calories)

                console.log("knexData: ",knexData);
                if (knexData.result){
                    await this.userService.calcCalories(req.session.user!.id)
                    res.status(200).json({transaction_id:knexData.transaction_id})
                }else{ 
                    res.status(500).json({
                        message: '[USR003] - Server error'
                    });
                }
            }

        } catch (error) {
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    
    allOrders = async (req:Request, res:Response) => {
        try {
            let knexData = await this.shopService.getAllOrders(req.session.user!.id)
            console.log("knexData: ",knexData)
            res.status(200).json({knexData})
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }

    collctedOrder = async (req:Request, res:Response) => {
        try {
            let order = Number(req.params.id)
            await this.shopService.collectedOrder(order)
            res.status(200).json({message:"success"})
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }

}