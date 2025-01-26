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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.deleteUserHandler = exports.getUser = void 0;
const user_1 = require("../services/user");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_1.getUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Fetching users failed.' });
    }
});
exports.getUser = getUser;
const deleteUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedUsers = yield (0, user_1.deleteUser)(id);
        res.status(200).json(updatedUsers);
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Deleting user failed.' });
    }
});
exports.deleteUserHandler = deleteUserHandler;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, firstname, lastname, email } = req.body;
        yield (0, user_1.registerUser)(username, password, firstname, lastname, email);
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const token = yield (0, user_1.loginUser)(username, password);
        res.status(200).json({ token });
    }
    catch (error) {
        if (error.message === 'Authentication failed') {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});
exports.login = login;
