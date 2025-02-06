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

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Prisma disconnected.");
  process.exit(0); // Exit the application
});

app.listen(PORT, () => console.log(`Server is lsitening on port:${PORT}`));
