import express from 'express';
import expressSession from "express-session";
import { isLoggedIn } from './util/guard';

export const PORT = 8080;
export const app = express();

/*************************/
/****** Use Session ******/
/*************************/

interface User {
    id: number;
    email: string,
    username: string,
    icon?: string,
    password: string;
}

declare module "express-session" {
    interface SessionData {
        user?: User;
    }
}

const sessionMiddleware = expressSession({
    secret: "Just Do. Eat Later...",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
})

app.use(sessionMiddleware);

/**************************/
/****** Go To Routes ******/
/**************************/

// app.use('/users', userRoute)

/*********************************/
/****** Go To Static Folder ******/
/*********************************/

app.use(isLoggedIn, express.static('protect'));

/**************************/
/****** Start Server ******/
/**************************/

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});