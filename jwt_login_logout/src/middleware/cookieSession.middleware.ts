import { Response, Request, NextFunction } from "express";

export const cookieMiddleWare = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.signedCookies.cookie_id) {
    next();
    return;
  }
  // return res.json("cookie k ton tai, vui long dang nhap lai ");
  return res.redirect("/api/v2/auth/login")
};
