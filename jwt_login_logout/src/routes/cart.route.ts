const express = require("express");
import { Express } from "express";
import { cartController } from "../controllers/cart.controller";
import { cookieMiddleWare } from "../middleware/cookieSession.middleware";

const router: Express = express();

router.get("/add/:productId", cookieMiddleWare, cartController.postAddToCart);

router.get("/", cartController.getCartForUser);
router.get("/edit/:id", cartController.putCart);

export default router;
