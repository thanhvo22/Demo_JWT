import * as express from "express";
import { Request, Response } from "express";

export const cartController = {
    getCart: (req:Request, res:Response) => {
        res.send("get your card!");
    },

    postCart: (req:Request, res: Response)=> {
        res.send("post cart")
    }

}