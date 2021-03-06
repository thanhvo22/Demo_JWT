"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.cartController = void 0;
var cart_model_1 = require("../models/cart.model");
var product_model_1 = require("../models/product.model");
var session = require("express-session");
exports.cartController = {
    getCart: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var cart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cart_model_1["default"].find()];
                case 1:
                    cart = _a.sent();
                    res.json({
                        cart: cart
                    });
                    return [2 /*return*/];
            }
        });
    }); },
    postAddToCart: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var product_Id, sessionId, user_id, cartUser, test1_product, quantity, price_id, price_prd, total, newCart, newProduct, newCart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    product_Id = req.params.productId;
                    sessionId = req.signedCookies.sessionId;
                    user_id = req.signedCookies.cookie_id;
                    if (!sessionId) {
                        return [2 /*return*/, res.redirect("/product")];
                    }
                    return [4 /*yield*/, cart_model_1["default"].find({ user_id: user_id })];
                case 1:
                    cartUser = _a.sent();
                    test1_product = cart_model_1["default"]
                        .find({ "product.product_id": product_Id })
                        .lean();
                    console.log("something here", test1_product);
                    if (!!cartUser[0]) return [3 /*break*/, 4];
                    quantity = 1;
                    return [4 /*yield*/, product_model_1["default"].findById({ _id: product_Id })];
                case 2:
                    price_id = _a.sent();
                    price_prd = (price_id === null || price_id === void 0 ? void 0 : price_id.price) || 0;
                    total = quantity * price_prd;
                    return [4 /*yield*/, cart_model_1["default"].create({
                            user_id: user_id,
                            product: [
                                {
                                    product_Id: product_Id,
                                    quantity: quantity
                                },
                            ],
                            total: total
                        })];
                case 3:
                    newCart = _a.sent();
                    return [2 /*return*/, res.redirect("/product")];
                case 4:
                    if (!!test1_product) return [3 /*break*/, 6];
                    newProduct = {
                        id: product_Id,
                        quantity: 1
                    };
                    return [4 /*yield*/, cart_model_1["default"].updateOne({ _id: user_id }, { $addToSet: { product: newProduct } })];
                case 5:
                    newCart = _a.sent();
                    console.log("new cart _2", newCart);
                    return [2 /*return*/, res.redirect("/product")];
                case 6:
                    res.redirect("/product");
                    return [2 /*return*/];
            }
        });
    }); },
    getCartForUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user_id;
        return __generator(this, function (_a) {
            user_id = req.signedCookies.cookie_id;
            return [2 /*return*/];
        });
    }); },
    putCart: function (req, res) {
        res.send("edit cart");
    },
    deleteCart: function (req, res) {
        res.send("delete cart");
    }
};
