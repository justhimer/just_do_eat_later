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
    ) { }


    getAllFood = async (req: Request, res: Response) => {
        try {

            let knexData = await this.shopService.getAllFood()

            // let knexTypes = await this.shopService.getDistinctTypes()


            let resData: any = [];
            let foodObject = {}
            knexData.forEach((element: any) => {
                let allergensString = () => {
                    let array = []
                    for (let keys in element.allergens)
                        array.push(element.allergens[keys])
                    return array.join(",")
                }
                if (foodObject.hasOwnProperty(element.food_id)) {
                    foodObject[element.food_id]["portion"][element.portion] = {
                        name: element.portion,
                        calories: element.calories,
                        food_id: element.id
                    }
                } else {
                    foodObject[element.food_id] = {}
                    foodObject[element.food_id]["name"] = `${element.name}`
                    foodObject[element.food_id]["meta"] = {
                        allergens: allergensString(),
                        description: element.description,
                        image: element.image,
                        ingredients: element.ingredients.ingredients,
                        name: element.name,
                        preparation: element.preparation,
                        type: element.type,
                        type_id: element.type_id
                    }
                    foodObject[element.food_id]["portion"] = {
                    }
                    foodObject[element.food_id]["portion"][element.portion] = {
                        name: element.portion,
                        calories: element.calories,
                        food_id: element.id
                    }
                }
            });
            for (let keys in foodObject) {
                resData.push(foodObject[keys])
            }

            console.log("resData: ", { resData });
            let finalData = { data: resData }
            res.status(200).json(finalData)

        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }

    increaseFoodQuantity = async (req: Request, res: Response) => {
        try {
            console.log('here');

            let foodId = req.body.food_details_id;
            let foodQuantity = req.body.quantity;
            let checkItem = await this.shopService.getItemCount(req.session.user!.id, foodId)
            if (checkItem) {
                await this.shopService.addItem(req.session.user!.id, foodId, foodQuantity)
                res.status(200).json({ message: "Success" })
                return
            } else {
                await this.shopService.createItem(req.session.user!.id, foodId, foodQuantity)
                res.status(200).json({ message: "Success" })
                return
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    decreaseFoodQuantity = async (req: Request, res: Response) => {
        try {
            let foodId = req.body.food_details_id;
            let foodQuantity = req.body.quantity;
            console.log("foodID:", foodId, "foodQuantity", foodQuantity)
            let checkItem = await this.shopService.getItemCount(req.session.user!.id, foodId)
            console.log("checkItem: ", checkItem)
            if (checkItem < foodQuantity) {
                res.status(400).json({ message: "Decrease cannot be larger than quantity in shopping cart" })
            } else if (checkItem == foodQuantity) {
                console.log('deleting food')
                await this.shopService.deleteItem(req.session.user!.id, foodId)
                res.status(200).json({ message: "Success" })
                return
            } else {
                await this.shopService.deleteUnit(req.session.user!.id, foodId, foodQuantity)
                res.status(200).json({ message: "Success" })
                return
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    removeFood = async (req: Request, res: Response) => {
        try {
            let foodId = req.body.food_details_id;
            await this.shopService.deleteItem(req.session.user!.id, foodId)
            res.status(200).json({ message: "Success" })
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    deleteBasket = async (req: Request, res: Response) => {
        try {
            await this.shopService.deleteAll(req.session.user!.id)
            res.status(200).json({ message: "Success" })
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    getItemCount = async (req: Request, res: Response) => {
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
    getTotalCount = async (req: Request, res: Response) => {
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
    previewBasket = async (req: Request, res: Response) => {
        try {
            let knexData = await this.shopService.getAll(req.session.user!.id);
            let knexLocation = await this.shopService.getLocations();
            let resData = {
                data: knexData,
                location: knexLocation
            }
            res.status(200).json(resData)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }
    confirmOrder = async (req: Request, res: Response) => {
        try {
            let location_id = req.body.location_id
            let total_calories = req.body.total_calories
            console.log("location_id: ", location_id, "total_calories: ", total_calories);

            let currentUserCalories = (await this.userService.getCalroies(req.session.user!.id))['calories']

            console.log("currentUserCalories: ", currentUserCalories);

            if (currentUserCalories - total_calories < 0) {
                res.status(400).json({ message: "insufficient calories to purchase meal" })
            } else {
                console.log("submitting basket");

                let knexData = await this.shopService.submitBasket(req.session.user!.id, location_id, total_calories)

                console.log("knexData: ", knexData);
                if (knexData.result) {
                    await this.userService.calcCalories(req.session.user!.id)
                    res.status(200).json({ transaction_id: knexData.transaction_id })
                } else {
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

    allOrders = async (req: Request, res: Response) => {
        try {
            let knexData = await this.shopService.getAllOrders(req.session.user!.id)
            console.log("knexData: ", knexData)
            res.status(200).json({ knexData })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }

    collctedOrder = async (req: Request, res: Response) => {
        try {
            let order = Number(req.params.id)
            await this.shopService.collectedOrder(order)
            res.status(200).json({ message: "success" })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: '[USR003] - Server error'
            });
        }
    }

}