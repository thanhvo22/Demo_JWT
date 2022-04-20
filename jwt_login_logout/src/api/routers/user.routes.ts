import express, { Express } from "express";
const router: Express = express();
import userController from "../controllers/user.controller";
import { cookieMiddleWare } from '../../middleware/cookieSession.middleware';

router.get('/',cookieMiddleWare , userController.getUser);

router.get('/all-user', userController.getUser);

router.post('/create', userController.postUser);

router.put('/edit/:id', userController.putUser);

router.delete('/delete/:id', userController.deleteUser);
export default router