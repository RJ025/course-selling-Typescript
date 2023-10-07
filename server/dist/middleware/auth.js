"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = "ritik";
const authenticateJWT = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (authHeaders) {
        const token = authHeaders.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, user) => {
            // "string"
            if (err) {
                return res.sendStatus(401);
            }
            if (!user)
                return res.sendStatus(403);
            if (typeof user === "string")
                return res.sendStatus(403);
            req.headers["userId"] = user.id;
            next();
        });
    }
    else {
        return res.sendStatus(403);
    }
};
exports.authenticateJWT = authenticateJWT;
