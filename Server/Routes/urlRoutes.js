import express from "express";
import { shortenUrl, redirectUrl, getStats, getUserUrls } from "../Controllers/urlController.js";
import authenticate from '../Middleware/auth.js'

const router = express.Router();

router.post("/shorten",authenticate, shortenUrl);
router.get("/user/urls", authenticate, getUserUrls);
router.get("/stats/:code", getStats);
router.get("/:code", redirectUrl);

export default router;
