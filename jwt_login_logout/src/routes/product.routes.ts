const express = require("express");
const { authPage } = require("../middleware/role.middleware");
import { Express } from "express";
import { ProductController } from "../controllers/product.controller";
import { upload } from "../utils/multer";

const router: Express = express();
//USER
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);

//ADMIN
router.get("/create", authPage("Admin"), ProductController.getCreateProduct);
router.get("/edit/:id", authPage("Admin"), ProductController.getEditProduct);
router.post(
  "/create",
  authPage("Admin"),
  upload.single("image"),
  ProductController.postProduct
);
router.put(
  "/edit/:id",
  authPage("Admin"),
  upload.single("image"),
  ProductController.putProduct
);
router.delete("/delete/:id", authPage("Admin"), ProductController.delProduct);

export default router;
