"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var mongoose = require("mongoose");
var app = require("./app");
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
