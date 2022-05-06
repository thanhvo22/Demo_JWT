import { Response, Request, NextFunction } from "express";
import cartModel from "../models/cart.model";
export const cartMiddleware = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("cart middleware: ");
  const user_id = req.signedCookies.cookie_id;
  const cartUser: any = await cartModel.findOne({ user_id: user_id });
  console.log(cartUser);
  if (cartUser) {
    next();
    return cartUser;
  }

  return res.redirect("/product");
};
