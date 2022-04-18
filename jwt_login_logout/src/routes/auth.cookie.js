"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_cookie_1 = __importDefault(require("../controllers/auth.cookie"));
const cookieSession_middleware_1 = require("../middleware/cookieSession.middleware");
const router = (0, express_1.default)();
router.get("/login", cookieSession_middleware_1.cookieMiddleWare, auth_cookie_1.default.getLogin);
// register
router.post("/register", auth_cookie_1.default.postRegister);
//login
router.post("/login", auth_cookie_1.default.postLogin);
router.get("/logout", auth_cookie_1.default.deleteLogin);
exports.default = router;
