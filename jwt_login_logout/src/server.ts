import * as dotenv from "dotenv";
dotenv.config();

import authRouter from "./api/routers/auth.route";
import authCookieRouter from "./routes/auth.cookie";
import userRouter from "./api/routers/user.routes";
import userPugRouter from "./routes/user.route";
import productRouter from "./routes/product.routes";
import cartRouter from "./routes/cart.route";
import { sessionMiddleware } from "./middleware/session.middleware";
import { cookieMiddleWare } from "./middleware/cookieSession.middleware";

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
var session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const app = express();

app.use(
  session({
    secret: "a secret string",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
);
app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET)); //using signed \\ signedCookies

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(sessionMiddleware);

console.log(__dirname);
app.set("views", path.join(__dirname, "../views"));

app.set("view engine", "pug");
console.log("PATH: ", path.join(__dirname, "public"));
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

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 2,
  message: "Too many connection",
});
// console.log(authCookieRouter.path());

app.use("/auth", authCookieRouter);
app.use("/user", cookieMiddleWare, userPugRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

//v1 call post man
app.use("/api/v1/user", apiLimiter, userRouter);
app.use("/api/v1/auth", authRouter);
// /cms -admin
