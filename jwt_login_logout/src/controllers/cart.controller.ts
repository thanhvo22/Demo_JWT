import * as express from "express";
import { Request, Response } from "express";
import cartModel from "../models/cart.model";
import productModel from "../models/product.model";
import { ICart } from "../interface/cart.interface";
var session = require("express-session");

export const cartController = {
  getCart: async (req: Request, res: Response) => {
    const cart = await cartModel.find();

    res.json({
      cart,
    });
  },

  postAddToCart: async (req: Request, res: Response) => {
    const product_Id = req.params.productId;
    const sessionId = req.signedCookies.sessionId;
    const user_id = req.signedCookies.cookie_id;
    if (!sessionId) {
      return res.redirect("/product");
    }
    const cartUser = await cartModel.find({ user_id: user_id });
    // console.log("user_Cart", cartUser);

    const test1_product = cartModel
      .find({ "product.product_id": product_Id })
      .lean(); // seem good
    console.log("something here", test1_product);
    if (!cartUser[0]) {
      let quantity: number = 1;
      const price_id = await productModel.findById({ _id: product_Id });
      let price_prd = price_id?.price || 0;
      let total = quantity * price_prd;
      let newCart = await cartModel.create({
        user_id,
        product: [
          {
            product_Id,
            quantity,
          },
        ],
        total: total,
      });
      return res.redirect("/product");
    }


    if (!test1_product) {
      let newProduct = {
        product_id: product_Id,
        quantity: 1,
      };

      let newCart = await cartModel.findOneAndUpdate(
        { _id: user_id },
        { $push: { product: newProduct } },
      );
      console.log("new cart _2", newCart);
      return res.redirect("/product");
    }

    res.redirect("/product");
  },

  getCartForUser: async (req: Request, res: Response) => {
    const user_id = req.signedCookies.cookie_id;
  },
  putCart: (req: Request, res: Response) => {
    res.send("edit cart");
  },

  deleteCart: (req: Request, res: Response) => {
    res.send("delete cart");
  },
};
