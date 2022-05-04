"use strict";
exports.__esModule = true;
var express = require("express");
var router = express();
var user_controller_1 = require("../controllers/user.controller");
var authPage = require("../middleware/role.middleware").authPage;
var multer_1 = require("../utils/multer");
// const multer = require("multer");
// var upload = multer({ dest: "./src/public/uploads/" });
// USER
router.get("/", authPage("Admin"), user_controller_1.userPugController.getUser);
router.get("/info", user_controller_1.userPugController.getInfo);
router.get("/info/edit", user_controller_1.userPugController.getEdit);
router.post("/info/edit", multer_1.upload.single("image"), user_controller_1.userPugController.putUser);
// Admin
router.get("/create", authPage('Admin'), user_controller_1.userPugController.getCreateUser);
router.post("/create", authPage('Admin'), multer_1.upload.single("image"), user_controller_1.userPugController.postUser);
router["delete"]("/delete/:id", user_controller_1.userPugController.deleteUser);
exports["default"] = router;
