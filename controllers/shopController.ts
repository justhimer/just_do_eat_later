import { Request, Response } from "express";
import { ShopService } from "../services/shopService";
import { checkPassword } from "../util/hash";
import { knex } from "../util/db";
import { UserService } from "../services/userService";

export class ShopController {

    constructor(
        private shopService: ShopService,
        private userService: UserService
        ) {}


}