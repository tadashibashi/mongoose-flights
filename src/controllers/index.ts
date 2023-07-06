import {Request, Response, NextFunction} from "express";

function _index(req: Request, res: Response, next: NextFunction): void {
    res.render("index");
}

export default {
    index: _index,
};
