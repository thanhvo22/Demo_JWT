import express from "express";
import * as dotenv from "dotenv";
// import { errorHandler } from "./middleware/error";
// import { notFoundHandler } from "./middleware/not-found";
import authRouter from "./routes/auth.route";
import mongoose from "mongoose";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import authCookieRouter from "./routes/auth.cookie";

import cookieParser from "cookie-parser";

const app = express();

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT);
const uri: string = `mongodb://localhost:27017/testTS`;

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });

app.get("/", (req, res) => {
  res.render("auth/login.pug");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v2/auth", authCookieRouter);
