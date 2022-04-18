"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Account", accountSchema);
