import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import { Request, Response } from "express";
const cloudinary = require("../utils/cloudinary");
import productModel from "../models/product.model";
const session = require("express-session");

export const ProductController = {
  getProducts: async (req: Request, res: Response) => {
    const products = await productModel.find();
    return res.render("products/index", {products})
  },
  getProduct: async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await productModel.findById(id);
    return res.json(product);
  },
  getCreateProduct: (req: any, res: Response) => {
    console.log("get create product");
    res.render("products/create.pug");
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
      return res.redirect("/product");
    } catch (error) {
      res.json({
        message: error,
      });
    }
  },
  getEditProduct: (req: Request, res: Response) => {
    res.send("get edit product");
  },
  putProduct: async (req: Request, res: Response) => {
    console.log("putProduct:   ")
    try {
      const id = req.params.id;
      let product_cloud = await productModel.findById(id);
      console.log("product_cloud:   ", product_cloud);
      if(product_cloud){
        await cloudinary.uploader.destroy(product_cloud?.cloudinary_id);
      }
      let path = req.file;
      console.log("path:   ", path);
      let img;
      if (path) {
        img = await cloudinary.uploader.upload(path.path);
      }

      console.log("img cloud: ",img)
      const { name, price } = req.body;
      
      const newProduct = await productModel.findByIdAndUpdate(id, {
        name,
        price: price || product_cloud?.price,
        image: img.secure_url || product_cloud?.cloudinary_id,
        cloudinary_id: img.public_id || product_cloud?.cloudinary_id,
      });

      console.log("update profile:   ", newProduct);
      return res.json({
          message:"edit product successfully",
          product: newProduct
      })
    } catch (error) {}
  },
  delProduct: async (req: Request, res: Response) => {
    const id = req.params.id;
    const img_cloud:any = await productModel.findById(id)
    await cloudinary.uploader.destroy(img_cloud.cloudinary_id);
    await img_cloud.remove();
    return res.json({
        message: "delete product successfully",
        
    })
  },
};
