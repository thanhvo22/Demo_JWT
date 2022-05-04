"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var cartSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account"
    },
    product: [
        {
            product_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number
            }
        }
    ],
    total: {
        type: Number
    }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("Cart", cartSchema);
