"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
// import cors from "cors";
// import { errorHandler } from "./middleware/error";
// import { notFoundHandler } from "./middleware/not-found";
var auth_route_1 = require("./api/routers/auth.route");
var auth_cookie_1 = require("./routes/auth.cookie");
var user_routes_1 = require("./api/routers/user.routes");
var user_pug_route_1 = require("./routes/user.pug.route");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var multer = require("multer");
var rateLimit = require("express-rate-limit");
var app = express();
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
console.log("PATH: ", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));
if (!process.env.PORT) {
    process.exit(1);
}
var PORT = parseInt(process.env.PORT);
var uri = "mongodb://localhost:27017/testTS";
mongoose
    .connect(uri)
    .then(function () {
    return app.listen(PORT, function () {
        return console.log("Server running on http://localhost:".concat(PORT));
    });
})["catch"](function (err) {
    throw err;
});
var apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 2,
    message: "Too many connection"
});
// console.log(authCookieRouter.path());
app.use("/auth", auth_cookie_1["default"]);
app.use("/user", user_pug_route_1["default"]);
//v1 call post man
app.use("/api/v1/user", apiLimiter, user_routes_1["default"]);
app.use("/api/v1/auth", auth_route_1["default"]);
