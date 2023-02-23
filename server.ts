import express from 'express';
import expressSession from "express-session";
import { isLoggedIn } from './util/guard';
import { knex } from './util/db';
import { UserService } from './services/userService';
import { UserController } from './controllers/userController';
import { makeUserRoutes } from './routes/userRoute';
import { User } from './util/model';
import { sessionMiddleware,io,server,app, grantExpress} from './util/middleware';
import path from "path"
import { GrantSessionStore } from 'grant';

/* #region session */
/* #endregion */

export const PORT = 8080;

//declare interfaces
/* #region session */
declare module "express-session" {
    interface SessionData {
        user?: User;
        grant?:any;
    }
}

/* #endregion */

// load essential middlewares
/* #region session */
app.use(sessionMiddleware);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(grantExpress as express.RequestHandler); //for OAUTH
/* #endregion */

//socket.io
/* #region session */
io.use((socket,next)=>{
    let req = socket.request as express.Request;
    let res = req.res as express.Response;
    sessionMiddleware(req,res,next as express.NextFunction)
})

io.on("connection", function (socket) {
    const req = socket.request as express.Request;
  });
/* #endregion */

//app routing
/* #region routes */
export const userService = new UserService(knex);
export const userController = new UserController(userService);
app.use('/users', makeUserRoutes());
/* #endregion */


// static folders
/* #region static folders */
app.use(express.static("public"))
app.use(express.static('images'))
app.use(isLoggedIn, express.static('protect'));
/* #endregion */

//catch all for 404
/* #region session */
app.use((req,res)=>{
    res.sendFile(path.join(__dirname,"public","404.html"))
})
/* #endregion */


/* #region start server */
server.listen(PORT, () => {
    console.log(`Socket Enabled: Listening at http://localhost:${PORT}`);
});
/* #endregion */