"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ");
    if (!token || !token[1]) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token[1], process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
module.exports = verifyToken;
