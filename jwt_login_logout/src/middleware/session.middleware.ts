const shortid = require("shortid");
var session = require("express-session");
import { NextFunction, Request, Response } from "express";
import cartModel from "../models/cart.model";
export const sessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.signedCookies.sessionId) {
    let sessionId = req.signedCookies.cookie_id;
    res.cookie("sessionId", sessionId, {
      signed: true,
    });

    await cartModel.create({
      id: sessionId,
    });
  }

  next();
};
