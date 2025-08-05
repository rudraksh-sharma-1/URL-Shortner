import Url from "../Models/url.js"; // use `.js` for ES modules
import { nanoid } from "nanoid";

// Create short URL
export async function shortenUrl(req, res) {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "URL required" });

  try {
    const shortCode = nanoid(7);
    const url = new Url({
      originalUrl,
      shortCode,
      user: req.user.userId, // 👈 inject userId from token
    });
    await url.save();
    res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

// Redirect to original URL
export async function redirectUrl(req, res) {
  try {
    const { code } = req.params;
    const url = await Url.findOne({ shortCode: code });
    if (!url) return res.status(404).send("Not found");

    url.clickCount++;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).send("Server error");
  }
}

// Get stats
export async function getStats(req, res) {
  try {
    const { code } = req.params;
    const url = await Url.findOne({ shortCode: code });
    if (!url) return res.status(404).send("Not found");

    res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      clickCount: url.clickCount,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
}


export async function getUserUrls(req, res) {
  const { page = 1, limit = 10 } = req.query;

  try {
    const urls = await Url.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Url.countDocuments({ user: req.user.userId });

    res.json({
      urls,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}