import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use();
app.use("/api/v1/user", userRoute);
app.use("/api/v1/url", urlRouter);
