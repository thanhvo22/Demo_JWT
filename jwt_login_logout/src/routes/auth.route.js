"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.default)();
//login
router.get("/login", auth_middleware_1.verifyToken, auth_controller_1.default.getLogin);
// register
router.post("/register", auth_controller_1.default.postRegister);
//login
router.post("/login", auth_controller_1.default.postLogin);
router.post("/token", auth_controller_1.default.postToken);
router.delete("/logout", auth_controller_1.default.deleteLogin);
exports.default = router;
