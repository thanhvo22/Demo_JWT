import express, { Express } from "express";
import authController from "../../api/controllers/auth.controller";
import { verifyToken } from "../../middleware/auth.middleware";
const router: Express = express();

//login
router.get("/login", verifyToken, authController.getLogin);

// register
router.post("/register", authController.postRegister);

//login
router.post("/login", authController.postLogin);
router.post("/token", authController.postToken);

router.delete("/logout", authController.deleteLogin);

export default router;
