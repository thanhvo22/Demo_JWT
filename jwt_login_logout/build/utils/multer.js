"use strict";
exports.__esModule = true;
exports.upload = void 0;
var multer = require("multer");
var path = require("path");
// Multer config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
exports.upload = multer({ storage: storage, fileFilter: fileFilter });
