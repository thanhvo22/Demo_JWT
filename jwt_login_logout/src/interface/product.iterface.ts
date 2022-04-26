import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  image?: string;
  cloudinary_id?: string;
}