// import { Request, Response } from "express";
// import { UserService } from "../services/userService";
// import { UserController } from "./userController";
// import { createRequestWithSession, createEmptyRequest, createEmptyResponse } from "../util/test-helper";
// import { Knex } from "knex";
// // import { checkPassword } from "../util/hash";

// const knexConfig = require("../knexfile");
// const knex = Knex(knexConfig["test"]); // Co

// describe('UserController', () => {
//     let userService: UserService;
//     let userController: UserController;
//     let req: Request;
//     let reqS: Request;
//     let res: Response;
//     let fakeUser: any;  // interface to be provided
//     let fakeIsMatched: boolean;
//     beforeEach(() => {
//         // fake data
//         userService = new UserService({} as any);
//         fakeUser = {
//             email: "123@gmail.com",
//             password: "password",
//             icon: "icon.jpg",
//             first_name: "Amy",
//             last_name: "Chan",
//             gender: 'F',
//             dob: '1992-02-05',
//             height: 170,
//             weight: 80,
//         }
//         fakeIsMatched = true;
//         req = createEmptyRequest();
//         reqS = createRequestWithSession();
//         res = createEmptyResponse();
        
//         // fake functions
//         // jest.mock("../util/db");
//         userService.getUserByEmail = jest.fn(
//             async( email: string ) => fakeUser
//         );
//         userService.userDetails = jest.fn(
//             async( userId: number ) => fakeUser
//         );
//         userController = new UserController(userService);
//     });

//     it('login', async() => {
//         // call the method
// 		await userController.login(req, res);

// 		// expectation
// 		expect(userService.getUserByEmail).toBeCalledTimes(1)
//         // expect(checkPassword).toBeCalledTimes(1)
//     });
// });