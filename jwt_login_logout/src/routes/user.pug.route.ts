const express = require("express");
import { Express } from "express";
const router:Express = express();
import { Request, Response, NextFunction } from "express";
import { userPugController } from "../controllers/user.controller";
import { cookieMiddleWare } from "../middleware/cookieSession.middleware";

import {upload} from '../utils/multer';
// const multer = require("multer");
// var upload = multer({ dest: "./src/public/uploads/" });

router.get("/", cookieMiddleWare, userPugController.getUser);

router.get("/create", userPugController.getCreateUser);

router.get("/info", userPugController.getInfo);

router.post("/create", upload.single("image"), userPugController.postUser);

router.get("/info/edit", userPugController.getEdit);

router.post("/info/edit", upload.single("image"), userPugController.putUser);

router.delete("/delete/:id", userPugController.deleteUser);

export default router;
