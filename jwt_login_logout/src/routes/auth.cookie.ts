import express, { Express } from "express";
import authCookieCTL from "../controllers/auth.cookie";
import { cookieMiddleWare } from "../middleware/cookieSession.middleware";
const router: Express = express();

router.get('/', authCookieCTL.getLogin);
router.get("/user", cookieMiddleWare, authCookieCTL.getLogin);

// register
router.post("/register", authCookieCTL.postRegister);

//login
router.post("/login", authCookieCTL.postLogin);

router.get("/logout", authCookieCTL.deleteLogin);

export default router;
