const express = require("express");
import { Express } from "express";
import { cartController } from "../controllers/cart.controller";
const router:Express = express();

router.get("/", cartController.getCart);

router.post("/add/:id", cartController.postAddToCart);



export default router;