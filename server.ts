import express from 'express';
import expressSession from "express-session";
import { isLoggedIn } from './util/guard';
import { knex } from './util/db';
import { UserService } from './services/userService';
import { UserController } from './controllers/userController';
import { makeUserRoutes } from './routes/userRoute';
import { User } from './util/model';

export const PORT = 8080;
export const app = express();

/* #region session */
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
export const userService = new UserService(knex);
export const userController = new UserController(userService);
app.use('/users', makeUserRoutes());
/* #endregion */


/* #region static folders */
app.use(isLoggedIn, express.static('protect'));
/* #endregion */


/* #region start server */
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
/* #endregion */


