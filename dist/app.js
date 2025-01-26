"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const userRoutes = require('./routes/user');
dotenv_1.default.config(); // Load environment variables
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3000', 10);
// MongoDB connection
mongoose_1.default
    .connect("mongodb+srv://kushananushka6060:eIQlOhbW31pu93xs@cluster0.hedhj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})
    .catch((err) => console.error(`Could not connect to database server`, err));
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/user', userRoutes);
// Routes
app.get("/", (req, res) => {
    return res.send('Anushka Wijewickrama');
});
// Export the app for testing or other purposes
exports.default = app;
