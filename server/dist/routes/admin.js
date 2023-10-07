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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const admin = yield db_1.Admin.findOne({ username });
    if (admin) {
        return res.status(201).json({
            message: "admin already registered"
        });
    }
    else {
        const cred = { username, password };
        const newAdmin = new db_1.Admin(cred);
        newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, auth_1.SECRET, { expiresIn: '1h' });
        res.json({
            message: `${username} registered`,
            token
        });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const admin = yield db_1.Admin.findOne({ username });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, auth_1.SECRET, { expiresIn: '1h' });
        return res.status(201).json({
            message: `${username} welcome`,
            token
        });
    }
    else {
        res.status(401).json({
            message: 'unauth access'
        });
    }
}));
router.post('/course', auth_1.authenticateJWT, (req, res) => {
});
exports.default = router;
