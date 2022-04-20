import { model, Schema } from "mongoose";
import { IAccount } from "../interface/account.iterface";

const accountSchema: Schema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },

    pass: {
      type: String,
      required: true,
    },

    name: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IAccount>("Account", accountSchema);
