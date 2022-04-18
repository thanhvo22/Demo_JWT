"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_model_1 = __importDefault(require("../models/account.model"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const getLogin = (req, res) => {
    console.log("hello");
    // res.render("/auth/login");
    res.send("hello bro");
};
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pass } = req.body;
    if (!user || !pass)
        return res.status(400).json({
            success: false,
            message: "user or pass trong ",
        });
    try {
        const userName = yield account_model_1.default.findOne({ user });
        if (!userName)
            return res.status(400).json({
                success: false,
                message: "tai khoan khong co ton tai",
            });
        const passValid = yield argon2_1.default.verify(userName.pass, pass);
        if (!passValid)
            return res.status(400).json({
                success: false,
                message: "mat khau or tai khoan k dung",
            });
        //all good -> return token
        const accessToken = jsonwebtoken_1.default.sign({ user: userName._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "5m",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ user: userName._id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1h",
        });
        res.json({
            success: true,
            message: " login successfully ",
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "error",
        });
    }
});
const postRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pass } = req.body;
    if (!user || !pass)
        return res.status(400).json({
            success: false,
            message: "user or pass trong ",
        });
    try {
        const userName = yield account_model_1.default.findOne({ user });
        console.log(userName);
        if (userName)
            return res.status(400).json({
                success: false,
                message: "user da ton tai",
            });
        const hashedPass = yield argon2_1.default.hash(pass);
        const newUser = new account_model_1.default({
            user,
            pass: hashedPass,
        });
        yield newUser.save();
        const accessToken = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1m",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "50m",
        });
        res.json({
            success: true,
            message: " user created successfully ",
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
const postToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.sendStatus(401);
    try {
        const user = yield jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
        const newUser = user;
        const accessToken = yield jsonwebtoken_1.default.sign({ newUser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
        res.json({ accessToken, refreshToken });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
});
const deleteLogin = (req, res) => {
    localStorage.setItem("access_token", JSON.stringify([]));
    res.sendStatus(204);
};
exports.default = {
    getLogin,
    postLogin,
    postRegister,
    postToken,
    deleteLogin,
};
