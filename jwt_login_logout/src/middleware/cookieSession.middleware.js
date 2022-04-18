"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieMiddleWare = void 0;
const cookieMiddleWare = function (req, res, next) {
    if (req.signedCookies.access_token) {
        next();
    }
    return res.json("cookie k ton tai, vui long dang nhap lai ");
};
exports.cookieMiddleWare = cookieMiddleWare;
