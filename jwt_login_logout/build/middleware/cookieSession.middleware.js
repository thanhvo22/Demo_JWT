"use strict";
exports.__esModule = true;
exports.cookieMiddleWare = void 0;
var cookieMiddleWare = function (req, res, next) {
    console.log("id_user:", req.signedCookies.cookie_id);
    if (req.signedCookies.cookie_id) {
        next();
        return;
    }
    // return res.json("cookie k ton tai, vui long dang nhap lai ");
    return res.redirect("auth/login");
};
exports.cookieMiddleWare = cookieMiddleWare;
