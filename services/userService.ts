import type { Knex } from "knex";
import type { User, UserSignup, signupIcon } from '../util/interfaces';
import { hashPassword } from "../util/hash";

export class UserService {

    constructor(private knex: Knex) { }

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
        let { first_name, last_name, email, password, confirm, date_of_birth, gender, height, weight } = reqData
        let hashedPassword = await hashPassword(password);
        let users = await this.knex('users')
            .insert({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
                birth_date: date_of_birth,
                gender: gender,
                height: height,
                weight: weight,
                icon: icon,
                subscribed:true
            })
            .returning(["id", "email", "first_name", "last_name", "password", "icon"]);

        return users[0];

    }


    async userDetails(userId: number) {
        // add codes here
        let details = await (this.knex
            .select("*")
            .from("users")
            .where("id", `${userId}`)
            .first())

        return details
    }
    async changeImg(reqData: any, id: number) {
        //add codes here
        try {
            await this.knex('users')
                .where('id', id)
                .update({
                    icon: reqData,
                    updated_at: new Date()
                })
        } catch (error) {
            console.log("fail: ", error)
        }
    }

    async changeAccount(reqData: any, id: number) {
        // add codes here
        try {
            if (reqData.password == "AAATK3!7") {
                await this.knex('users')
                    .where('id', id)
                    .update({
                        email: reqData.email,
                        updated_at: new Date()
                    })
            } else {
                await this.knex('users')
                    .where('id', id)
                    .update({
                        email: reqData.email,
                        password: reqData.email,
                        updated_at: new Date()
                    })
            }
        } catch (error) {
            console.log("fail: ", error)
        }
    }
    async changePersonal(reqData: any, id: number) {
        // add codes here
        try {
            await this.knex('users')
                .where('id', id)
                .update({
                    first_name: reqData.first_name,
                    last_name: reqData.last_name,
                    gender: reqData.gender,
                    birth_date: reqData.dob,
                    updated_at: new Date()
                })
        } catch (error) {
            console.log("fail: ", error)
        }
    }
    async changeBody(reqData: any, id: number) {
        // add codes here
        try {
            await this.knex('users')
                .where('id', id)
                .update({
                    height: reqData.height,
                    weight: reqData.weight,
                    updated_at: new Date()
                })
        } catch (error) {
            console.log("fail: ", error)
        }
    }

    async deleteUser() {
        // add codes here
    }

    async complete(reqData: any, id: number): Promise<User> {
        let { birth_date, gender, height, weight } = reqData
        let users = await this.knex('users')
            .update({
                birth_date: birth_date,
                gender: gender,
                height: height,
                weight: weight
            })
            .where("id", `${id}`)
            .returning(["id", "email", "first_name", "last_name", "password", "icon"]);

        return users[0];
    }

    async getCalroies(id: number): Promise<number> {
        let knexData = await this.knex
            .select("calories")
            .from("users")
            .where("id", id)
            .first()

        return knexData
    }

    async calcCalories(id: number) {
        await this.knex.raw(`
        update users 
        set "calories" = 
        coalesce((select sum (calorie_change.calories)
        from calorie_change
        where (user_id = ${id}) and ("method" = 'plus')) ,0) - coalesce ((
            select sum (calorie_change.calories) 
            from calorie_change 
            where (user_id = ${id}) and ("method" = 'minus')
            ) , 0)
        where id = ${id}
        `)
    }
}