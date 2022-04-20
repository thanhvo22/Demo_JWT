import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
// import cors from "cors";
// import { errorHandler } from "./middleware/error";
// import { notFoundHandler } from "./middleware/not-found";
import authRouter from "./routes/auth.route";
import authCookieRouter from "./routes/auth.cookie";
import userRouter from "./routes/user.routes";
import userPugRouter from './routes/user.pug.route';

const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();



app.use(express.json());
// app.use(cors());
// app.use(cookieParser());
app.use(cookieParser(process.env.SESSION_SECRET));  //using signed \\ signedCookies
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
  .catch((error) => {
    throw error;
  });

// console.log(authCookieRouter.path());
app.use("/api/v2/auth", authCookieRouter); 
app.use("/api/v2/user", userPugRouter);

app.use("/api/v1/auth", authRouter);

//v1 call post man
app.use("/api/v1/user", userRouter);

