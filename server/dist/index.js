"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.json({
        message: "hi there"
    });
});
app.use('/admin', admin_1.default);
mongoose_1.default.connect('mongodb+srv://ritikjain025:ritik@cluster0.qgylsum.mongodb.net/', {
    dbName: 'courses'
});
app.listen(3000, () => {
    console.log('http://localhost:3000');
});
