import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import { Request, Response } from "express";
import accountModel from "../../models/account.model";
const cloudinary = require("../../utils/cloudinary");

const argon2 = require("argon2");

export const userController = {
  getUser: async (req: Request, res: Response) => {
    const user = await accountModel.find();
    res.json({
      user,
    });
    // res.render("users/index");
  },

  getInfo: async (req: Request, res: Response) => {
    let id = req.signedCookies.cookie_id;
    const user = await accountModel.findById(id);
    res.json({
      user,
    });
    // res.render("users/index");
  },

  postUser: async (req: Request, res: Response) => {
    try {
      const { user, name, pass } = req.body;
      const findUser = await accountModel.findOne({ user });
      if (findUser)
        return res.status(401).json({ message: "tai khoan da ton tai!" });
      const hashedPass = await argon2.hash(pass);
      const newUser = new accountModel({
        user,
        name,
        pass: hashedPass,
      });
      newUser.save();
      res.status(201).json({
        user: newUser,
        message: "created user successfully",
      });

      res.render("users/create");
    } catch (error) {
      return res.status(404).json({
        message: error,
      });
    }
  },

  putUser: async (req: Request, res: Response) => {
    console.log("test");
    try {
      const id = req.params.id;
      console.log("put user: ", id);
      let user_cloud: any = await accountModel.findById(id);

      await cloudinary.uploader.destroy(user_cloud.cloudinary_id);
      let path = req.file;
      let avatar;
      if (path) {
        avatar = await cloudinary.uploader.upload(path.path);
      }
      const { name, pass } = req.body;
      const hashedPass = await argon2.hash(pass);
      const newUser = await accountModel.findByIdAndUpdate(id, {
        name,
        pass: hashedPass,
        image: avatar.secure_url || user_cloud.cloudinary_id,
        cloudinary_id: avatar.public_id || user_cloud.cloudinary_id,
      });

      console.log("update profile:   ", newUser);

      res.json({
        message: "update profile successfull",
        user: newUser,
      });
    } catch (error) {
      res.status(404).json({
        message: error,
      });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const _id = req.params.id;
      const newUser = await accountModel.findByIdAndRemove({ _id });
      res.status(201).json({
        message: "delete user successfully",
      });
    } catch (error) {
      res.json(error);
    }
  },
};
