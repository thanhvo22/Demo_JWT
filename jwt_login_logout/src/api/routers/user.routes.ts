import { userController } from "../controllers/user.controller";
import { cookieMiddleWare } from "../../middleware/cookieSession.middleware";
import {upload} from '../../utils/multer';
const express = require("express");
const router = express();

router.get("/", cookieMiddleWare, userController.getUser);

router.get("/all-user", userController.getUser);

router.post("/create", userController.postUser);

router.get("/info", cookieMiddleWare, userController.getInfo);

router.put("/edit/:id",upload.single("image"), userController.putUser);

router.delete("/delete/:id", userController.deleteUser);
export default router;
