const express = require("express");
const router = express.Router();
const blogService = require("../services/blogService");

router.get("/", async (req, res) => {
    try {
        const stats = await blogService.getCachedStats();
        res.json(stats);
    } catch (error) {
        console.error("error: ", error);
        res.status(500).json({ error: "internal server error" });
    }
});

module.exports = router;
