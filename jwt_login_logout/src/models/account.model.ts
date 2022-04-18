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

    image: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<IAccount>("Account", accountSchema);
