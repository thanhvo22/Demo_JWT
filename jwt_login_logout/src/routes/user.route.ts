const express = require("express");
import { Express } from "express";
const router:Express = express();
import { Request, Response, NextFunction } from "express";
import { userPugController } from "../controllers/user.controller";

const {authPage} = require("../middleware/role.middleware");
import {upload} from '../utils/multer';
// const multer = require("multer");
// var upload = multer({ dest: "./src/public/uploads/" });
// USER
router.get("/", authPage("Admin") ,userPugController.getUser);
router.get("/info", userPugController.getInfo);
router.get("/info/edit", userPugController.getEdit);
router.post("/info/edit", upload.single("image"), userPugController.putUser);


// Admin
router.get("/create", authPage('Admin'),userPugController.getCreateUser);
router.get("/:id",authPage('Admin'),userPugController.getUserID);
router.post("/create", authPage('Admin'),upload.single("image"), userPugController.postUser);
router.delete("/delete/:id",authPage('Admin'), userPugController.deleteUser);

export default router;
