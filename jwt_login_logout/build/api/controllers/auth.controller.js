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
var account_model_1 = require("../../models/account.model");
var jwt = require("jsonwebtoken");
var argon2 = require("argon2");
var dotenv = require("dotenv");
dotenv.config();
var getLogin = function (req, res) {
    console.log("hello");
    // res.render("/auth/login");
    res.send("hello bro");
};
var postLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, pass, userName, passValid, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user = _a.user, pass = _a.pass;
                if (!user || !pass)
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "user or pass trong "
                        })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, account_model_1["default"].findOne({ user: user })];
            case 2:
                userName = _b.sent();
                if (!userName)
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "tai khoan khong co ton tai"
                        })];
                return [4 /*yield*/, argon2.verify(userName.pass, pass)];
            case 3:
                passValid = _b.sent();
                if (!passValid)
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "mat khau or tai khoan k dung"
                        })];
                //all good -> return token
                // const accessToken = jwt.sign(
                //   { user: userName._id },
                //   process.env.ACCESS_TOKEN_SECRET,
                //   {
                //     expiresIn: "1m",
                //   }
                // );
                // const refreshToken = jwt.sign(
                //   { user: userName._id },
                //   process.env.REFRESH_TOKEN_SECRET,
                //   {
                //     expiresIn: "1h",
                //   }
                // );
                res.cookie("cookie_id", userName.id, {
                    signed: true
                });
                res.json({
                    success: true,
                    message: " login successfully "
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(500).json({
                    success: false,
                    message: "error"
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var postRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, pass, userName, hashedPass, newUser, accessToken, refreshToken, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user = _a.user, pass = _a.pass;
                if (!user || !pass)
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "user or pass trong "
                        })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, account_model_1["default"].findOne({ user: user })];
            case 2:
                userName = _b.sent();
                console.log(userName);
                if (userName)
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: "user da ton tai"
                        })];
                return [4 /*yield*/, argon2.hash(pass)];
            case 3:
                hashedPass = _b.sent();
                newUser = new account_model_1["default"]({
                    user: user,
                    pass: hashedPass
                });
                return [4 /*yield*/, newUser.save()];
            case 4:
                _b.sent();
                accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "1m"
                });
                refreshToken = jwt.sign({ userId: newUser._id }, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: "50m"
                });
                res.json({
                    success: true,
                    message: " user created successfully ",
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).json({
                    success: false,
                    message: error_2
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var postToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, user, newUser, accessToken, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.body.refreshToken;
                if (!refreshToken)
                    return [2 /*return*/, res.sendStatus(401)];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)];
            case 2:
                user = _a.sent();
                newUser = user;
                return [4 /*yield*/, jwt.sign({ newUser: newUser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" })];
            case 3:
                accessToken = _a.sent();
                res.json({ accessToken: accessToken, refreshToken: refreshToken });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.log(error_3);
                res.sendStatus(403);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteLogin = function (req, res) {
    res.clearCookie("cookie_id");
    res.json({
        message: "logout successfully"
    });
};
exports["default"] = {
    getLogin: getLogin,
    postLogin: postLogin,
    postRegister: postRegister,
    postToken: postToken,
    deleteLogin: deleteLogin
};
