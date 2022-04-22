import * as dotenv from "dotenv";
dotenv.config();
// import cors from "cors";
// import { errorHandler } from "./middleware/error";
// import { notFoundHandler } from "./middleware/not-found";
import authRouter from "./api/routers/auth.route";
import authCookieRouter from "./routes/auth.cookie";
import userRouter from "./api/routers/user.routes";
import userPugRouter from "./routes/user.pug.route";

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
// app.use(cors());
// app.use(cookieParser());
app.use(cookieParser(process.env.SESSION_SECRET)); //using signed \\ signedCookies
// khong khac gi cookie nhung co them secret, co the ktra cookie.

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
console.log(__dirname);
app.set("views", path.join(__dirname, "../views"));

app.set("view engine", "pug");
console.log("PATH: ", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "public")));

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
  .catch((err: Error) => {
    throw err;
  });

// console.log(authCookieRouter.path());
app.use("/auth", authCookieRouter);
app.use("/user", userPugRouter);

//v1 call post man
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
