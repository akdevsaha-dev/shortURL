var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import userRoute from "./routes/auth.route.js";
import urlRoute from "./routes/url.route.js";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
const prisma = new PrismaClient();
const app = express();
dotenv.config();
const PORT = process.env.PORT;
console.log(PORT);
app.use(cookieParser());
app.use(express());
app.use(express.json());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/url", urlRoute);
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    console.log("Prisma disconnected.");
    process.exit(0); // Exit the application
}));
app.listen(PORT, () => console.log(`Server is lsitening on port:${PORT}`));
