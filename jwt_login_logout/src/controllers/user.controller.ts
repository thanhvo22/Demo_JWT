import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import { Request, Response } from "express";
import accountModel from "../models/account.model";
const cloudinary = require("../utils/cloudinary");
const argon2 = require("argon2");

export const userPugController = {
  getUser: async (req: Request, res: Response) => {
    const users = await accountModel.find();
    return res.render("users/index", {
      users: users,
    });
  },

  getUserID: async(req:Request, res:Response) => {
    const user = await accountModel.findById(req.params.id);
    return res.render("users/viewUser", {user});
  },

  getCreateUser: (req: Request, res: Response) => {
    res.render("users/create");
  },

  getInfo: async (req: Request, res: Response) => {
    const id = req.signedCookies.cookie_id;
    let user = await accountModel.findById(id);
    res.render("users/info", { user });
  },

  getEdit: async (req: Request, res: Response) => {
    const id = req.signedCookies.cookie_id;
    let user = await accountModel.findById(id);

    res.render("users/edit", { user });
  },

  postUser: async (req: Request, res: Response) => {
    try {
      let { user, name, pass } = req.body;
      let path = req.file;
      const result = await cloudinary.uploader.upload(path?.path);
      console.log(result);
      
      const findUser = await accountModel.findOne({ user });
      if (findUser)
        return res.status(401).json({ message: "tai khoan da ton tai!" });
      const hashedPass = await argon2.hash(pass);
      const newUser = new accountModel({
        user,
        name,
        pass: hashedPass,
        image: result.secure_url,
        cloudinary_id: result.public_id,
      });
      await newUser.save();

      console.log("newuser: ", newUser);

      res.redirect("/user");
    } catch (error) {
      return res.status(404).json({
        message: error,
      });
    }
  },

  putUser: async (req: Request, res: Response) => {
    console.log("test");
    try {
      
      const id = req.signedCookies.cookie_id;
      console.log("put user: ", id);
      let user_cloud = await accountModel.findById(id);
      if(user_cloud){
        await cloudinary.uploader.destroy(user_cloud?.cloudinary_id);
      }
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
        image: avatar.secure_url || user_cloud?.cloudinary_id,
        cloudinary_id: avatar.public_id || user_cloud?.cloudinary_id,
      });

      console.log("update profile:   ", newUser);

      res.redirect("/user/info");
    } catch (error) {
      res.status(404).json({
        message: error,
      });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      let user: any = await accountModel.findById(req.params.id);

      await cloudinary.uploader.destroy(user.cloudinary_id);
      await user.remove();
      res.status(201).json({
        message: "delete user successfully",
      });
    } catch (error) {
      res.json(error);
    }
  },
};
