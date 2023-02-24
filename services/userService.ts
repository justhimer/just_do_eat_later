import type { Knex } from "knex";
import type { User,UserSignup,signupIcon } from '../util/interfaces';
import { hashPassword } from "../util/hash";

export class UserService {

    constructor(private knex: Knex) { }

    async getGoogleUserProfile() {
        // add codes here
    }

    async getUserByEmail(email: string): Promise<User> {

        let user = await this.knex
            .select('*')
            .from('users')
            .where({
                email
            })
            .first();

        return user;

    }

    async createUser(reqData: any, icon: any): Promise<User> {
        let {first_name,last_name,email,password,confirm,date_of_birth,gender,height,weight} = reqData
        let hashedPassword = await hashPassword(password);
        let users = await this.knex('users')
            .insert({
                first_name:first_name,
                last_name:last_name,
                email:email,
                password: hashedPassword,
                birth_date: date_of_birth,
                gender: gender,
                height: height,
                weight:weight,
                icon:icon
            })
            .returning(["id","email","first_name","last_name","password","icon"]);

        return users[0];

    }

    async updateUser() {
        // add codes here
    }

    async deleteUser() {
        // add codes here
    }

    async complete(reqData: any,id:number): Promise<User>{
        let {birth_date,gender,height,weight} = reqData
        let users = await this.knex('users')
            .update({
                birth_date: birth_date,
                gender: gender,
                height: height,
                weight:weight
            })
            .where("id",`${id}`)
            .returning(["id","email","first_name","last_name","password","icon"]);

        return users[0];
    }

}