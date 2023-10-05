const express = require("express");
const router = express.Router();
const blogService = require("../services/blogService");

router.get("/", async (req, res) => {
    try {
        const query = req.query.query || "";
        const blogs = await blogService.getCachedResults(query);
        res.json(blogs);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
