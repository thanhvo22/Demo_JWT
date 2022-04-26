const express = require("express");
import {Express} from "express"
import { ProductController } from '../controllers/product.controller';
import { upload } from '../utils/multer';

const router:Express = express();

router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);
router.get("/create", ProductController.getCreateProduct);
router.get("/edit/:id", ProductController.getEditProduct);
router.post("/create", upload.single("image"),ProductController.postProduct);
router.put("/edit/:id", upload.single("image"),ProductController.putProduct);
router.delete("/delete/:id",ProductController.delProduct);

export default router;