import express, { Request, Response } from "express";
import argon2 from "argon2";
import jwt, { Secret } from "jsonwebtoken";
import accountModel from "../models/account.model";
import * as dotenv from "dotenv";
import { token } from "morgan";
dotenv.config();

const getLogin = (req: Request, res: Response) => {
  // res.render("src/views/auth/login.pug");
  res.render("auth/login")
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

    // res
    //   .cookie("cookie", accessToken, {
    //     httpOnly: true,
    //     signed: true,
    //   })
    res
      .cookie("accessToken", accessToken, {
        httpOnly:true
      })
      .status(200)
      .json(accessToken);
    // res.redirect("/users");
  } catch (error) {
    console.log(error);
    console.log(token);
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
// const postToken = (req: any, res: Response) => {
//     const refreshToken = req.body.refreshToken;
//     if (!refreshToken) return res.sendStatus(401);

//     const name = accountModel.findOne({user});
//     if (!name) return res.sendStatus(403);

//     try {
//       jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret);

//       const accessToken = jwt.sign(
//         { userId: name._id },
//         process.env.ACCESS_TOKEN_SECRET as Secret,
//         {
//           expiresIn: "1m",
//         }
//       );
//       updateRefreshToken(user.username, tokens.refreshToken);

//       res.json(tokens);
//     } catch (error) {
//       console.log(error);
//       res.sendStatus(403);
//     }
//   }

const deleteLogin = (req: any, res: Response) => {
  //   let user = accountModel.find((user: any) => user.id === req.userId);
  //   console.log(req.users);

  //   res.sendStatus(204);
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
};

export default {
  getLogin,
  postLogin,
  postRegister,
  deleteLogin,
};
