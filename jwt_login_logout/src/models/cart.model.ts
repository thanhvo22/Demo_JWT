import { model, Schema } from "mongoose";
import { ICart, Tproduct } from "../interface/cart.interface";
const cartSchema: Schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Account"
    },

    product:{
      product_id:{
        type: Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
      }
    },

    total: {
      type: Number,
      required: true,
    },

  },
  { timestamps: true }
);

export default model<ICart>("Cart", cartSchema);
