import * as express from "express";
import { Request, Response } from "express";
import cartModel from "../models/cart.model";
import productModel from "../models/product.model";
import { ICart } from "../interface/cart.interface";

export const cartController = {
  getCart: async (req: Request, res: Response) => {
    const cart = await cartModel.find();
    res.json({cart});
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
      .populate("products.product_id", "product_id price");
    if (!cartUser) {
      let quantity = 1;
      const price_id = await productModel.findById({ _id: product_Id });
      let price_prd = price_id?.price || 0;
      let total = quantity * price_prd;
      await cartModel.create({
        user_id,
        products: [
          {
            product_id: product_Id,
            quantity,
          },
        ],
        total,
      });
      return res.redirect("/product");
    }

    // check duplicate id
    let product: any = cartUser.products?.filter(
      (p: any) =>
        JSON.stringify(p.product_id._id) === JSON.stringify(product_Id)
    );

    if (product.length === 0) {
      console.log("cart doesn't have product");
      await cartModel.updateOne(
        { _id: cartUser._id },
        {
          $push: {
            products: {
              product_id: product_Id,
              quantity: 1,
            },
          },
        },
        { new: true }
      );
    } else {
      console.log("cart have product");
      await cartModel.findOneAndUpdate(
        { user_id: user_id, "products.product_id": product_Id },
        { $inc: { "products.$.quantity": 1 } }
      );
    }
    const price = cartUser.products.reduce((init: number, item: any) => {
        
        let total = init + (item.product_id.price * item.quantity)
        console.log("total", total);
        return total;
      }
    ,cartUser.total);
    console.log(price);
    await cartModel.findOneAndUpdate({ user_id: user_id }, { total: price });

    res.redirect("/product");
    // res.json({cartUser})
  },

  getCartForUser: async (req: Request, res: Response) => {
    const user_id = req.signedCookies.cookie_id;
    const cartUser: any = await cartModel
      .findOne({ user_id: user_id })
      .populate("products.product_id");
    return res.render("users/carts", { cartUser });
  },
  putCart: async (req: Request, res: Response) => {
    const cart_id = req.params.id;
    const status = "pending";
    console.log("put cart", status);
    await cartModel.findByIdAndUpdate(
      { _id: cart_id },
      {
        status,
      }
    );
    res.redirect("/product");
  },

  deleteCart: (req: Request, res: Response) => {
    res.send("delete cart");
  },
};
