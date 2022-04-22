const express = require("express");
import authCookieCTL from "../controllers/auth.cookie";
import { cookieMiddleWare } from "../middleware/cookieSession.middleware";
const router = express();

router.get("/", cookieMiddleWare, authCookieCTL.getLogin);
router.get("/login", authCookieCTL.getLogin);
router.get("/user", cookieMiddleWare, authCookieCTL.getUser);

// register
router.post("/register", authCookieCTL.postRegister);

//login
router.post("/login", authCookieCTL.postLogin);

router.get("/logout", authCookieCTL.deleteLogin);

export default router;
