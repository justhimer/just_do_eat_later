import express from "express";
import { shopController } from "../server";
import { isLoggedIn } from "../util/guard";

export function makeShopRoutes() {
	const shopRoutes = express.Router();

	shopRoutes.get('/allFood', shopController.getAllFood)
	
	shopRoutes.post('/addFood', isLoggedIn,shopController.increaseFoodQuantity)
	shopRoutes.post('/removeQuantity', isLoggedIn,shopController.decreaseFoodQuantity)
	shopRoutes.post('/removeFood', isLoggedIn,shopController.removeFood)
	shopRoutes.get('/deleteBasket', isLoggedIn,shopController.deleteBasket)
	shopRoutes.post('/itemCount', isLoggedIn,shopController.getItemCount)
	shopRoutes.get('/totalCount', isLoggedIn,shopController.getTotalCount)
	shopRoutes.get('/orderPreview', isLoggedIn,shopController.previewBasket)
	shopRoutes.post('/confirmOrder', isLoggedIn,shopController.confirmOrder)
	shopRoutes.get('/userOrders',isLoggedIn,shopController.allOrders)
	shopRoutes.get('/collctedOrder/:id',isLoggedIn,shopController.collctedOrder)

	return shopRoutes;
}