import express, { Express } from "express";
import authCookieCTL from "../controllers/auth.cookie";
import { cookieMiddleWare } from "../middleware/cookieSession.middleware";
const router = express();

router.get('/login', (req, res) => {res.render('auth/login')});
router.get("/user", cookieMiddleWare, authCookieCTL.getUser);

// register
router.post("/register", authCookieCTL.postRegister);

//login
router.post("/login", authCookieCTL.postLogin);

router.get("/logout", authCookieCTL.deleteLogin);

export default router;
