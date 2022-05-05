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
    const cartUser: any = await cartModel
      .findOne({ user_id: user_id })
      .populate("product.product_id");

    // cart not exist
    if (!cartUser) {
      let quantity: number = 1;
      const price_id = await productModel.findById({ _id: product_Id });
      let price_prd = price_id?.price || 0;
      let total = quantity * price_prd;
      await cartModel.create({
        user_id,
        product: [
          {
            product_id: product_Id,
            quantity: quantity,
          },
        ],
        total: total,
      });
      return res.redirect("/product");
    }

    // check duplicate id
    let product: any = cartUser.product?.find(
      (p: any) => p.product_id == product_Id
    );

    console.log("cartUser.product", cartUser.product);

    if (!product) {
      console.log("cart doesnt have product");
      await cartModel.updateOne(
        { _id: cartUser._id },
        {
          $push: {
            product: {
              product_id: product_Id,
              quantity: 1,
            },
          },
        },
        { new: true }
      );
      console.log("product", product);
    } else {
      console.log("cart have product");
      // const temp: any = cartUser.product;
      // let quantity = temp[itemIndex].quantity;
      // quantity++;
      await cartModel.findOneAndUpdate(
        { user_id: user_id, "product.product_id": product_Id },
        { $inc: { "product.$.quantity": 1 } }
      );
    }
    const price = cartUser.product.reduce(
      (init: number, item: any) => (init += item.product_id.price)  
    ,0);
    console.log(price);

    res.redirect("/product");
    // res.json({cartUser})
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
