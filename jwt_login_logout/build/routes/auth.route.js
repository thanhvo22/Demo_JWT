"use strict";
exports.__esModule = true;
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var auth_middleware_1 = require("../middleware/auth.middleware");
var router = (0, express_1["default"])();
//login
router.get("/login", auth_middleware_1.verifyToken, auth_controller_1["default"].getLogin);
// register
router.post("/register", auth_controller_1["default"].postRegister);
//login
router.post("/login", auth_controller_1["default"].postLogin);
router.post("/token", auth_controller_1["default"].postToken);
router["delete"]("/logout", auth_controller_1["default"].deleteLogin);
exports["default"] = router;
