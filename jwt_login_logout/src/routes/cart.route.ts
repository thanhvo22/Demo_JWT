const express = require("express");
import { Express } from "express";
import { cartController } from "../controllers/cart.controller";
const router:Express = express();

router.get("/add/:productId", cartController.postAddToCart);


router.get("/", cartController.getCart);





export default router;