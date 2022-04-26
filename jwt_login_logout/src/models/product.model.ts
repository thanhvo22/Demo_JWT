import { model, Schema } from "mongoose";
import { IProduct } from "../interface/product.iterface";

const productSchema: Schema = new Schema(
  {
    
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
