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
exports.userController = void 0;
var dotenv = require("dotenv");
dotenv.config();
var account_model_1 = require("../../models/account.model");
var cloudinary = require("../../utils/cloudinary");
var argon2 = require("argon2");
exports.userController = {
    getUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, account_model_1["default"].find()];
                case 1:
                    user = _a.sent();
                    res.json({
                        user: user
                    });
                    return [2 /*return*/];
            }
        });
    }); },
    getInfo: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.signedCookies.cookie_id;
                    return [4 /*yield*/, account_model_1["default"].findById(id)];
                case 1:
                    user = _a.sent();
                    res.json({
                        user: user
                    });
                    return [2 /*return*/];
            }
        });
    }); },
    postUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, user, name_1, pass, path, result, findUser, hashedPass, newUser, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, user = _a.user, name_1 = _a.name, pass = _a.pass;
                    path = req.file;
                    return [4 /*yield*/, cloudinary.uploader.upload(path === null || path === void 0 ? void 0 : path.path)];
                case 1:
                    result = _b.sent();
                    console.log("result:   ", result);
                    return [4 /*yield*/, account_model_1["default"].findOne({ user: user })];
                case 2:
                    findUser = _b.sent();
                    if (findUser)
                        return [2 /*return*/, res.status(401).json({ message: "tai khoan da ton tai!" })];
                    return [4 /*yield*/, argon2.hash(pass)];
                case 3:
                    hashedPass = _b.sent();
                    newUser = new account_model_1["default"]({
                        user: user,
                        name: name_1,
                        pass: hashedPass,
                        image: result.secure_url,
                        cloudinary_id: result.public_id
                    });
                    return [4 /*yield*/, newUser.save()];
                case 4:
                    _b.sent();
                    console.log("newuser: ", newUser);
                    res.json({
                        message: "create user successfully",
                        user: newUser
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    return [2 /*return*/, res.status(404).json({
                            message: error_1
                        })];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    putUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, user_cloud, path, avatar, _a, name_2, pass, hashedPass, newUser, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("test_pustUser");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, , 10]);
                    id = req.signedCookies.cookie_id;
                    console.log("put user: ", id);
                    return [4 /*yield*/, account_model_1["default"].findById(id)];
                case 2:
                    user_cloud = _b.sent();
                    if (!user_cloud) return [3 /*break*/, 4];
                    return [4 /*yield*/, cloudinary.uploader.destroy(user_cloud.cloudinary_id)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    path = req.file;
                    console.log("path:   ", path);
                    avatar = void 0;
                    if (!path) return [3 /*break*/, 6];
                    return [4 /*yield*/, cloudinary.uploader.upload(path.path)];
                case 5:
                    avatar = _b.sent();
                    _b.label = 6;
                case 6:
                    console.log("avatar:   ", avatar);
                    _a = req.body, name_2 = _a.name, pass = _a.pass;
                    return [4 /*yield*/, argon2.hash(pass)];
                case 7:
                    hashedPass = _b.sent();
                    return [4 /*yield*/, account_model_1["default"].findByIdAndUpdate(id, {
                            name: name_2,
                            pass: hashedPass || (user_cloud === null || user_cloud === void 0 ? void 0 : user_cloud.pass),
                            image: avatar.secure_url || (user_cloud === null || user_cloud === void 0 ? void 0 : user_cloud.image),
                            cloudinary_id: avatar.public_id || (user_cloud === null || user_cloud === void 0 ? void 0 : user_cloud.cloudinary_id)
                        })];
                case 8:
                    newUser = _b.sent();
                    res.json({
                        message: "update profile successfull",
                        user: newUser
                    });
                    return [3 /*break*/, 10];
                case 9:
                    error_2 = _b.sent();
                    res.status(404).json({
                        message: error_2
                    });
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); },
    deleteUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _id, newUser, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    _id = req.params.id;
                    return [4 /*yield*/, account_model_1["default"].findByIdAndRemove({ _id: _id })];
                case 1:
                    newUser = _a.sent();
                    res.status(201).json({
                        message: "delete user successfully"
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.json(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }
};
