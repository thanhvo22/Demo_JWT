import { Document } from "mongoose";

export interface IAccount extends Document {
  name: string;
  pass: string;
  image?: string;
}
