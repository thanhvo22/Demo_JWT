import { userController } from "../controllers/user.controller";
import { cookieMiddleWare } from "../../middleware/cookieSession.middleware";

const express = require("express");
const router = express();

router.get("/", cookieMiddleWare, userController.getUser);

router.get("/all-user", userController.getUser);

router.post("/create", userController.postUser);

router.put("/edit/:id", userController.putUser);

router.delete("/delete/:id", userController.deleteUser);
export default router;
