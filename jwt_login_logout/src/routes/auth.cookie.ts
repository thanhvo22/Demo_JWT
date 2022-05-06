const express = require("express");
import authCookieCTL from "../controllers/auth.cookie";
import { cookieMiddleWare } from "../middleware/cookieSession.middleware";

const authPage = require("../middleware/role.middleware");
const router = express();

// USER
router.get("/login", authCookieCTL.getLogin);
router.get("/register", authCookieCTL.getRegister)
router.post("/login", authCookieCTL.postLogin);
router.post("/register", authCookieCTL.postRegister);
router.get("/logout", authCookieCTL.deleteLogin);

router.get("/", cookieMiddleWare, authCookieCTL.getLogin);

export default router;
