import * as express from "express";
import { Request, Response } from "express";
import productModel from "../../models/product.model";
const cloudinary = require("../../utils/cloudinary");

export const ProductController = {
    getProducts: (req:Request, res:Response) => {
        res.send("get all products")
    },
    getProduct: (req:Request, res:Response) => {
        res.send("get a product")
    },
    getCreateProduct: (req:Request, res:Response) => {
        res.send("get create")
    },
    postProduct: (req:Request, res:Response) => {
        res.send("post product")
    },
    getEditProduct: (req:Request, res:Response) => {
        res.send("get edit product")
    },
    putProduct: (req:Request, res:Response) => {
        res.send("put product")
    },
    delProduct: (req:Request, res:Response) => {
        res.send("delete product")
    },

}