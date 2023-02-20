import type { Knex } from "knex";
import type { User } from "../util/model";
import { hashPassword } from "../util/hash";

export class UserService {

    constructor(private knex: Knex) { }

    async getGoogleUserProfile() {
        // add codes here
    }

    async getUserByUsername(username: string): Promise<User> {

        let user = await this.knex
            .select('*')
            .from('users')
            .where({
                username
            })
            .first();

        return user;

    }

    async createUser(username: string, password: string): Promise<User> {

        let hashedPassword = await hashPassword(password);

        let users = await this.knex('users')
            .insert({
                username,
                password: hashedPassword
            })
            .returning('*');

        return users[0];

    }

    async updateUser() {
        // add codes here
    }

    async deleteUser() {
        // add codes here
    }

}