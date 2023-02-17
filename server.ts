import express from 'express';
import expressSession from "express-session";
import { isLoggedIn } from './util/guard';
import { userRoute } from './routes/userRoute';

export const PORT = 8080;
export const app = express();

/* #region session */
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
/* #endregion */


/* #region routes */
app.use('/users', userRoute);
/* #endregion */


/* #region static folders */
app.use(isLoggedIn, express.static('protect'));
/* #endregion */


/* #region start server */
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
/* #endregion */