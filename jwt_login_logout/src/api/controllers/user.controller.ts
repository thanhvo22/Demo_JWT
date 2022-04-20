import express, { Request, Response } from "express";
import accountModel from "../../models/account.model";
const argon2 = require("argon2");
import * as dotenv from "dotenv";
dotenv.config();

export = {
  getUser: async (req: Request, res: Response) => {
    const user = await accountModel.find();
    res.json({
      user,
    });
    // res.render("users/index");
  },

  postUser: async (req: Request, res: Response) => {
    try {
      const { user, name, pass } = req.body;
      const findUser = await accountModel.findOne({user});
      if(findUser) return res.status(401).json({message: "tai khoan da ton tai!"})
      const hashedPass = await argon2.hash(pass);
      const newUser = new accountModel({
        user,
        name,
        pass:hashedPass,
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
    try {
      const _id = req.params.id;
      const {user, name, pass} = req.body
      const hashedPass = await argon2.hash(pass);
      const newUser = await accountModel.findByIdAndUpdate(_id, 
        {
            user,
            name,
            pass:hashedPass
        });
      res.status(201).json({
        message: "edit user successfully",
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
      const newUser = await accountModel.findByIdAndRemove({_id});
      res.status(201).json({
          message: "delete user successfully"
      })
    } catch (error) {
        res.json(error);
    }
  },
};
