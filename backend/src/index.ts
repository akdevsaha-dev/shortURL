import express from "express";
import userRoute from "./routes/auth.route.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
console.log(PORT);
app.use(express());
app.use("/api/v1/user", userRoute);
// app.use("/api/v1/url", urlRoute);

app.listen(PORT, () => console.log(`Server is lsitening on port:${PORT}`));
