"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var accountSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("Account", accountSchema);
