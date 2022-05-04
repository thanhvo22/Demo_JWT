"use strict";
exports.__esModule = true;
var express = require("express");
var cart_controller_1 = require("../controllers/cart.controller");
var router = express();
router.get("/add/:productId", cart_controller_1.cartController.postAddToCart);
router.get("/", cart_controller_1.cartController.getCart);
exports["default"] = router;
