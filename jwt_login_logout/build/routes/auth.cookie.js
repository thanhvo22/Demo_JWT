"use strict";
exports.__esModule = true;
var express_1 = require("express");
var auth_cookie_1 = require("../controllers/auth.cookie");
var cookieSession_middleware_1 = require("../middleware/cookieSession.middleware");
var router = (0, express_1["default"])();
router.get('/login', auth_cookie_1["default"].getLogin);
router.get("/user", cookieSession_middleware_1.cookieMiddleWare, auth_cookie_1["default"].getLogin);
// register
router.post("/register", auth_cookie_1["default"].postRegister);
//login
router.post("/login", auth_cookie_1["default"].postLogin);
router.get("/logout", auth_cookie_1["default"].deleteLogin);
exports["default"] = router;
