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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.deleteUser = exports.getUsers = void 0;
const User = require('../models/user');
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User.find();
});
exports.getUsers = getUsers;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield User.deleteMany({ _id: id });
    return yield User.find(); // Return the updated list of users
});
exports.deleteUser = deleteUser;
const registerUser = (username, password, firstname, lastname, email) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = new User({ username, password: hashedPassword, firstname, lastname, email });
    yield user.save();
});
exports.registerUser = registerUser;
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ username });
    if (!user) {
        throw new Error('Authentication failed');
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Authentication failed');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
});
exports.loginUser = loginUser;
