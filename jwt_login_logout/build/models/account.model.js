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
    name: {
        type: String
    },
    image: {
        type: String
    },
    roles: {
        type: String,
        "enum": ["User", "Sharers"],
        "default": "User"
    },
    cloudinary_id: {
        type: String
    }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("Account", accountSchema);
