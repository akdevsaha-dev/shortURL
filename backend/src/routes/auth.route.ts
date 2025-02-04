import express from "express";
import { signup } from "../controllers/auth.controllers.js";

const router = express.Router();

router.get("/signup", signup);
// router.post("/signin", signin);
// router.post("/logout", logout);

export default router;
