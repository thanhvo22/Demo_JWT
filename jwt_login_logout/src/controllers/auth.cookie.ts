import express, { Request, Response } from "express";
import argon2 from "argon2";
import jwt, { Secret } from "jsonwebtoken";
import accountModel from "../models/account.model";
import * as dotenv from "dotenv";
import { token } from "morgan";
dotenv.config();

const getLogin = (req: Request, res: Response) => {
  
  // res.render("src/views/auth/login.pug");
  res.render("auth/login.pug");
};
const getUser = (req:Request, res:Response) => {
  res.render("users/index")
}

const postLogin = async (req: Request, res: Response) => {
  const { user, pass } = req.body;
  if (!user || !pass)
    return res.status(400).json({
      success: false,
      message: "user or pass trong ",
    });

  try {
     const userName = await accountModel.findOne({ user });

    if (!userName)
      return res.status(400).json({
        success: false,
        message: "tai khoan khong co ton tai",
      });

    const passValid = await argon2.verify(userName.pass, pass);
    if (!passValid)
      return res.status(400).json({
        success: false,
        message: "mat khau or tai khoan k dung",
      });
    res
      .cookie("cookie_id", userName.id, {
        signed: true
      })
      // .status(200)
      // .json(accessToken);
    res.redirect("/api/v2/auth/user");
  } catch (error) {
    console.log(error);
    console.log(token);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
  // res.redirect('users/index')
};

const postRegister = async (req: Request, res: Response) => {
  const { user, pass } = req.body;

  if (!user || !pass)
    return res.status(400).json({
      success: false,
      message: "user or pass trong ",
    });

  try {
    const userName = await accountModel.findOne({ user });
    console.log(userName);
    if (userName)
      return res.status(400).json({
        success: false,
        message: "user da ton tai",
      });

    const hashedPass = await argon2.hash(pass);
    const newUser = new accountModel({
      user,
      pass: hashedPass,
    });

    await newUser.save();
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      {
        expiresIn: "1m",
      }
    );

    res.json({
      success: true,
      message: " user created successfully ",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
const deleteLogin = (req: any, res: Response) => {
  res.clearCookie("cookie_id")
  res.render("index");
};

export default {
  getLogin,
  postLogin,
  postRegister,
  deleteLogin,
  getUser
};
