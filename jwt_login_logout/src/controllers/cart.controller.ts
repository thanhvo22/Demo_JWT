import * as express from "express";
import { Request, Response } from "express";
import cartModel from "../models/cart.model";

export const cartController = {
  getCart: (req: Request, res: Response) => {
    res.send("get your card!");
  },

  postAddToCart: (req: Request, res: Response) => {
    const product_Id = req.params.id;
    const user_id = req.signedCookies.cookie_id;
    const {quatity} = req.body;
    const cart = new cartModel({
        
    })
  },

  putCart: (req: Request, res: Response) => {
    res.send("edit cart");
  },

  deleteCart: (req: Request, res: Response) => {
    res.send("delete cart");
  },
};
