import express from 'express'

export const isLoggedIn = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (req.session?.user) {
        next();
        return
    } else {
        res.redirect('/login.html?message=Please+Login');
    }
}

export function loggedInForSocket (req: express.Request){
    req.session.user? true : false
}