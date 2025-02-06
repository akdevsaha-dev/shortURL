import express from "express";
import { baseurl, customurl } from "../controllers/url.controllers.js";
import { protectRoute } from "../middleware/index.middleware.js";

const router = express.Router();

router.post("/baseurl", protectRoute, baseurl);
router.get("/:id", protectRoute, customurl);

export default router;
