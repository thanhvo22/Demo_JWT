const express = require("express");
import { Express } from "express";
const router:Express = express();
import { Request, Response, NextFunction } from "express";
import { adminController } from "../controllers/admin.controller";
const {authPage} = require("../middleware/role.middleware");
import {upload} from '../utils/multer';



// Admin
router.get("/product/create",adminController.getCreateProduct);
router.get("/product/",adminController.getProducts);
router.post("/product/create",upload.single("image"), adminController.postProduct);
router.delete("/product/delete/:id", adminController.delProduct);

router.get("/carts",adminController.getCarts );
router.get("/carts/edit/:id", adminController.putCart)
export default router;
