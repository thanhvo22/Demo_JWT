"use strict";
exports.__esModule = true;
exports.verifyToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv").config();
var verifyToken = function (req, res, next) {
    var authHeader = req.header("Authorization");
    var token = authHeader && authHeader.split(" ")[1]; //Bearer token
    if (!token)
        return res.status(401).json({
            success: false,
            message: "Access token not found"
        });
    try {
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};
exports.verifyToken = verifyToken;
