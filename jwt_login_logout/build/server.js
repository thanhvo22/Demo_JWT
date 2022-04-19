"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv = require("dotenv");
// import { errorHandler } from "./middleware/error";
// import { notFoundHandler } from "./middleware/not-found";
var auth_route_1 = require("./routes/auth.route");
var mongoose_1 = require("mongoose");
dotenv.config();
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
var auth_cookie_1 = require("./routes/auth.cookie");
var path_1 = require("path");
var cookie_parser_1 = require("cookie-parser");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.use((0, cookie_parser_1["default"])());
// app.use(cookieParser(process.env.SESSION_SECRET));  --using signed \\ signedCookies
// khong khac gi cookie nhung co them secret, co the ktra cookie. 
app.use(body_parser_1["default"].json()); // for parsing application/json
app.use(body_parser_1["default"].urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set("views", path_1["default"].join(__dirname, "views"));
app.set("view engine", "pug");
console.log("PATH: ", path_1["default"].join(__dirname, "views"));
app.use(express_1["default"].static(path_1["default"].join(__dirname, "public")));
if (!process.env.PORT) {
    process.exit(1);
}
var PORT = parseInt(process.env.PORT);
var uri = "mongodb://localhost:27017/testTS";
mongoose_1["default"]
    .connect(uri)
    .then(function () {
    return app.listen(PORT, function () {
        return console.log("Server running on http://localhost:".concat(PORT));
    });
})["catch"](function (error) {
    throw error;
});
app.get("/", function (req, res) {
    res.render("auth/login.pug");
});
app.use("/api/v1/auth", auth_route_1["default"]);
app.use("/api/v2/auth", auth_cookie_1["default"]);
