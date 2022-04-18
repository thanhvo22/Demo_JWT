import { Response, Request, NextFunction } from "express";

export const cookieMiddleWare = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.signedCookies.access_token) {
    next();
  }
  return res.json("cookie k ton tai, vui long dang nhap lai ");
};
