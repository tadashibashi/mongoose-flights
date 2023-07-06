import {NextFunction, Request, Response} from "express";

/**
 * Middleware that ensures there is a vars object in res.locals
 */
export default function vars(varsName = "vars") {
    return function(req: Request, res: Response, next: NextFunction) {
        res.locals[varsName] = {};
        next();
    }
}
