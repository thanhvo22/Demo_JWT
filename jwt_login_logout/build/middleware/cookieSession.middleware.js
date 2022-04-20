"use strict";
exports.__esModule = true;
exports.cookieMiddleWare = void 0;
var cookieMiddleWare = function (req, res, next) {
    if (req.signedCookies.cookie_id) {
        next();
    }
    return res.json("cookie k ton tai, vui long dang nhap lai ");
};
exports.cookieMiddleWare = cookieMiddleWare;
