import express from "express";
import { shopController } from "../server";

export function makeShopRoutes() {
	const shopRoutes = express.Router();

	shopRoutes.get('/allFood/:group_by',shopController.getAllFood)
    shopRoutes.post('/addFood',shopController.increaseFoodQuantity)
	shopRoutes.post('/removeQuantity',shopController.decreaseFoodQuantity)
	shopRoutes.get('/removeFood',shopController.removeFood)
	shopRoutes.get('/deleteBasket',shopController.deleteBasket)
	shopRoutes.get('/itemCount',shopController.getItemCount)
	shopRoutes.get('/totalCount',shopController.getTotalCount)
	shopRoutes.get('/orderPreview',shopController.previewBasket)
	shopRoutes.post('/confirmOrder',shopController.confirmOrder)

	return shopRoutes;
}