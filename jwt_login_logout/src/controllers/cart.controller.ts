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
    const cartUser = await cartModel.findOne({ user_id: user_id });
    // console.log("user_Cart", cartUser);

    const test1_product = cartModel
      .find({ "product.product_id": product_Id })
      .lean(); // seem good
    // console.log("something here", test1_product);

    if (!cartUser) {
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

    let itemIndex: any = cartUser.product?.findIndex(
      (p) => p.product_id == product_Id
    );
    console.log("item index:   ", itemIndex);
    
    let item = cartUser.product;
    if (itemIndex == -1) {
      item?.push({
        product_id: product_Id,
        quantity: 1
      })
    await cartUser.save();

    }else{
      // const temp: any = cartUser.product;
      // let quantity = temp[itemIndex].quantity;
      // quantity++;
      await cartModel.findOneAndUpdate(
        {user_id: user_id, 'product.product_id': product_Id},
        {$inc: {"product.$.quantity": 1}});
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
