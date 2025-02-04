var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/index.utils.js";
const prisma = new PrismaClient();
export const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "Plese enter username and password",
            });
            return;
        }
        const saltRounds = 10;
        const hashedPassword = yield bcrypt.hash(password, saltRounds);
        const existingUser = yield prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!existingUser) {
            const user = yield prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                },
            });
            if (user) {
                generateToken(user.id, res);
                res.status(201).json({
                    id: user.id,
                    email: user.email,
                });
                return;
            }
        }
        else {
            res.json({
                message: "User already exists!",
            });
            return;
        }
    }
    catch (error) {
        console.error(error);
        console.log("error in signup controller");
        res.json({
            message: "internal server error",
        });
    }
});
export const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "Plese enter username and password",
            });
            return;
        }
        const user = yield prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (user) {
            const isPasswordCorrect = yield bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                res.status(400).json({
                    message: "Passoword is incorrect",
                });
                return;
            }
            generateToken(user.id, res);
            res.json({
                id: user.id,
                email: user.email,
            });
            return;
        }
        else {
            res.json({
                message: "Please create an account",
            });
            return;
        }
    }
    catch (error) {
        console.error(error);
        console.log("error in signin controller");
        res.json({
            message: "internal server error",
        });
    }
});
