"use strict";
exports.__esModule = true;
var express = require("express");
var router = express();
var user_controller_1 = require("../controllers/user.controller");
var cookieSession_middleware_1 = require("../middleware/cookieSession.middleware");
var multer_1 = require("../utils/multer");
// const multer = require("multer");
// var upload = multer({ dest: "./src/public/uploads/" });
router.get("/", cookieSession_middleware_1.cookieMiddleWare, user_controller_1.userPugController.getUser);
router.get("/:id", cookieSession_middleware_1.cookieMiddleWare, user_controller_1.userPugController.getUserID);
router.get("/create", user_controller_1.userPugController.getCreateUser);
router.get("/info", user_controller_1.userPugController.getInfo);
router.post("/create", multer_1.upload.single("image"), user_controller_1.userPugController.postUser);
router.get("/info/edit", user_controller_1.userPugController.getEdit);
router.post("/info/edit", multer_1.upload.single("image"), user_controller_1.userPugController.putUser);
router["delete"]("/delete/:id", user_controller_1.userPugController.deleteUser);
exports["default"] = router;
