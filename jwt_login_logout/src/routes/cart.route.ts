const express = require("express");
import { Express } from "express";
import { cartController } from "../controllers/cart.controller";
import { cookieMiddleWare } from "../middleware/cookieSession.middleware";
import { cartMiddleware } from "../middleware/cart.middleware";

const router: Express = express();

router.get("/add/:productId", cookieMiddleWare, cartController.postAddToCart);

router.get("/", cartMiddleware,cartController.getCartForUser);
router.get("/edit/:id", cartController.putCart);
router.get("/delete/:id",cartController.deleteCart);

export default router;
