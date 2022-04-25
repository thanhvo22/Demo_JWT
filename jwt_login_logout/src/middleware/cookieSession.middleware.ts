import { Response, Request, NextFunction } from "express";

export const cookieMiddleWare = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("id_user:",req.signedCookies.cookie_id)
  if (req.signedCookies.cookie_id) {
    next();
    return;
  }
  // return res.json("cookie k ton tai, vui long dang nhap lai ");
  return res.redirect("auth/login");
};
