import { Document } from "mongoose";

export interface IAccount extends Document {
  user: string;
  name?: string;
  pass: string;
  image?: string;
  cloudinary_id: string;
}
