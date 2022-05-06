import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import { Request, Response } from "express";
import accountModel from "../models/account.model";
import cartModel from "../models/cart.model";
const cloudinary = require("../utils/cloudinary");
const argon2 = require("argon2");
import productModel from "../models/product.model";

export const adminController = {
  getCreateProduct: (req: any, res: Response) => {
    res.render("admin/products/create");
  },

  getCarts: async (req: Request, res: Response) => {
    const carts = await cartModel.find();
    res.render("admin/carts/cartAll", {carts})
  },
  getInfo: async (req: Request, res: Response) => {
    const id = req.signedCookies.cookie_id;
    let user = await accountModel.findById(id);
    res.render("admin/info", { user });
  },
  getProducts: async (req: Request, res: Response) => {
    const products = await productModel.find();
    return res.render("admin/products/index", { products });
  },
  getProduct: async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await productModel.findById(id);
    return res.json(product);
  },
  postProduct: async (req: Request, res: Response) => {
    console.log("create Product!");
    try {
      const { name, price } = req.body;
      console.log("body", name, price);
      let path = req.file;

      const result = await cloudinary.uploader.upload(path?.path);
      console.log("result", result);

      const newProduct = new productModel({
        name,
        price,
        image: result.secure_url,
        cloudinary_id: result.public_id,
      });
      await newProduct.save();
      return res.redirect("/cms/product");
    } catch (error) {
      res.json({
        message: error,
      });
    }
  },
  delProduct: async (req: Request, res: Response) => {
    const id = req.params.id;
    const img_cloud: any = await productModel.findById(id);
    await cloudinary.uploader.destroy(img_cloud.cloudinary_id);
    await img_cloud.remove();
    return res.json({
      message: "delete product successfully",
    });
  },
  putCart: async (req: Request, res: Response) => {
    const cart_id = req.params.id;
    const status = "accept";
    console.log("put cart", status);
    await cartModel.findByIdAndUpdate({_id: cart_id}, {
      status
    })
    res.redirect("/cms/carts");
  },
};
