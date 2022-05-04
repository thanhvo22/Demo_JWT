"use strict";
exports.__esModule = true;
var express = require("express");
var authPage = require("../middleware/role.middleware").authPage;
var product_controller_1 = require("../controllers/product.controller");
var multer_1 = require("../utils/multer");
var router = express();
//USER
router.get("/", product_controller_1.ProductController.getProducts);
router.get("/:id", product_controller_1.ProductController.getProduct);
//ADMIN
router.get("/create", authPage("Admin"), product_controller_1.ProductController.getCreateProduct);
router.get("/edit/:id", authPage("Admin"), product_controller_1.ProductController.getEditProduct);
router.post("/create", authPage("Admin"), multer_1.upload.single("image"), product_controller_1.ProductController.postProduct);
router.put("/edit/:id", authPage("Admin"), multer_1.upload.single("image"), product_controller_1.ProductController.putProduct);
router["delete"]("/delete/:id", authPage("Admin"), product_controller_1.ProductController.delProduct);
exports["default"] = router;
