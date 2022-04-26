"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    cloudinary_id: {
        type: String
    }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("Product", productSchema);
