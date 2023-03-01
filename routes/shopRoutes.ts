import express from "express";
import { shopController } from "../server";
import { isLoggedIn } from "../util/guard";

export function makeShopRoutes() {
	const shopRoutes = express.Router();

	shopRoutes.get('/allFood', shopController.getAllFood)
	shopRoutes.post('/addFood', shopController.increaseFoodQuantity)
	shopRoutes.post('/removeQuantity', shopController.decreaseFoodQuantity)
	shopRoutes.post('/removeFood', shopController.removeFood)
	shopRoutes.get('/deleteBasket', shopController.deleteBasket)
	shopRoutes.post('/itemCount', shopController.getItemCount)
	shopRoutes.get('/totalCount', shopController.getTotalCount)
	shopRoutes.get('/orderPreview', shopController.previewBasket)
	shopRoutes.post('/confirmOrder', shopController.confirmOrder)

	return shopRoutes;
}