"use strict";
exports.__esModule = true;
var user_controller_1 = require("../controllers/user.controller");
var cookieSession_middleware_1 = require("../../middleware/cookieSession.middleware");
var multer_1 = require("../../utils/multer");
var express = require("express");
var router = express();
router.get("/", cookieSession_middleware_1.cookieMiddleWare, user_controller_1.userController.getUser);
router.get("/all-user", user_controller_1.userController.getUser);
router.post("/create", user_controller_1.userController.postUser);
router.put("/edit/:id", multer_1.upload.single("image"), user_controller_1.userController.putUser);
router["delete"]("/delete/:id", user_controller_1.userController.deleteUser);
exports["default"] = router;
