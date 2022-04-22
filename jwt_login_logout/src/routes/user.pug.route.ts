const express = require("express");
const router = express();
import { userPugController } from "../controllers/user.pug.controller";
import { cookieMiddleWare } from "../middleware/cookieSession.middleware";

router.get("/", cookieMiddleWare, userPugController.getUser);

router.get("/create", userPugController.getCreateUser);
router.get("/all-user", userPugController.getUser);

router.post("/create", userPugController.postUser);

router.put("/edit/:id", userPugController.putUser);

router.delete("/delete/:id", userPugController.deleteUser);
export default router;
