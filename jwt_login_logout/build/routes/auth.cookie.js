"use strict";
exports.__esModule = true;
var express = require("express");
var auth_cookie_1 = require("../controllers/auth.cookie");
var cookieSession_middleware_1 = require("../middleware/cookieSession.middleware");
var authPage = require("../middleware/role.middleware");
var router = express();
// USER
router.get("/login", auth_cookie_1["default"].getLogin);
router.post("/login", auth_cookie_1["default"].postLogin);
router.post("/register", auth_cookie_1["default"].postRegister);
router.get("/logout", auth_cookie_1["default"].deleteLogin);
router.get("/", cookieSession_middleware_1.cookieMiddleWare, auth_cookie_1["default"].getLogin);
exports["default"] = router;
