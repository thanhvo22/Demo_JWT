const jwt = require("jsonwebtoken");
import { Response, Request, NextFunction } from "express";
require("dotenv").config();

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; //Bearer token

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Access token not found",
    });

  try {
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
