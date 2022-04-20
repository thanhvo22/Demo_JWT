"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = (0, express_1["default"])();
var user_pug_controller_1 = require("../controllers/user.pug.controller");
var cookieSession_middleware_1 = require("../middleware/cookieSession.middleware");
router.get('/', cookieSession_middleware_1.cookieMiddleWare, user_pug_controller_1["default"].getUser);
router.get('/all-user', user_pug_controller_1["default"].getUser);
router.post('/create', user_pug_controller_1["default"].postUser);
router.put('/edit/:id', user_pug_controller_1["default"].putUser);
router["delete"]('/delete/:id', user_pug_controller_1["default"].deleteUser);
exports["default"] = router;
