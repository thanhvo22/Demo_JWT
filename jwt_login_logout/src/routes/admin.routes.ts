const express = require("express");
import { Express } from "express";
const router:Express = express();
import { Request, Response, NextFunction } from "express";
import { userPugController } from "../controllers/user.controller";
import { cookieMiddleWare } from "../middleware/cookieSession.middleware";
const {authPage} = require("../middleware/role.middleware");
import {upload} from '../utils/multer';

router.get("/", cookieMiddleWare, authPage("Admin") ,userPugController.getUser);
router.get("/info", userPugController.getInfo);
router.get("/info/edit", userPugController.getEdit);
router.post("/info/edit", upload.single("image"), userPugController.putUser);


// Admin
router.get("/create", authPage('Admin'),userPugController.getCreateUser);
router.post("/create", authPage('Admin'),upload.single("image"), userPugController.postUser);
router.delete("/delete/:id", userPugController.deleteUser);

export default router;
