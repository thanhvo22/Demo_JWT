import accountModel from "../models/account.model";
import { Response, Request, NextFunction } from "express";

const authPage =  (permission: any) => {
  return async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.signedCookies.cookie_id;
    if (!userId) {
      // return res.status(403).json("You need sign in!");
      return res.redirect("/auth/login");
    }
    const user = await accountModel.findById(userId);
    if (!user) {
      // return res.status(403).json("user not found");
      return res.redirect("/auth/login");
    }
    console.log("user:   ",user)
    console.log(permission.includes(user.roles));
    if (!permission.includes(user.roles)) {
      return res.redirect("/product");
    }
    next();
  };
};


module.exports = {
    authPage
}