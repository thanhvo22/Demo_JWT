import express, { Request, Response } from "express";
import argon2 from "argon2";
import jwt, { Secret } from "jsonwebtoken";
import accountModel from "../models/account.model";
import * as dotenv from "dotenv";
dotenv.config();

const getLogin = (req: Request, res: Response) => {
  console.log("hello");
  // res.render("/auth/login");
  res.send("hello bro");
};

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

    //all good -> return token
    const accessToken = jwt.sign(
      { user: userName._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "5m",
      }
    );
    const refreshToken = jwt.sign(
      { user: userName._id },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      success: true,
      message: " login successfully ",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
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
    const refreshToken = jwt.sign(
      { userId: newUser._id },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      {
        expiresIn: "50m",
      }
    );

    res.json({
      success: true,
      message: " user created successfully ",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
const postToken = async (req: any, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const user = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret
    );
    // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
    const newUser = user;
    const accessToken = await jwt.sign(
      { newUser },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: "1m" }
    );
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};

const deleteLogin = (req: any, res: Response) => {
  localStorage.setItem("access_token", JSON.stringify([]));
  res.sendStatus(204);
};

export default {
  getLogin,
  postLogin,
  postRegister,
  postToken,
  deleteLogin,
};