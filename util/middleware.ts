import express from 'express'
import expressSession from 'express-session'
import http from "http"
import { Server as SocketIO } from "socket.io"
import dotenv from "dotenv"
import grant from 'grant'

export const sessionMiddleware = expressSession({
    secret: "workout and eat",
    resave: true,
    saveUninitialized: true,
    cookie: {secure:false}
})

export const app = express();
process.env.TZ = "Asia/Hong_Kong"
export const server = new http.Server(app)
export const io = new SocketIO(server)

//google oauth
dotenv.config()
export const grantExpress = grant.express({
    defaults: {
        origin: process.env.GRANT_ORIGIN,
        transport: "session",
        state: "true"
    },
    google:{
        key: process.env.GOOGLE_CLIENT_ID || "",
        secret: process.env.GOOGLE_CLIENT_SECRET || "",
        scope: ["profile","email"],
        callback: "/users/login/google"
    }
})