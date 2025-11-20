import express from "express";
import prisma from '../lib/prisma.js';
const router = express.Router();
// ------------------------------
// POST /api/links → CREATE LINK
// ------------------------------
router.post("/", async (req, res) => {
    try {
        const { url, code } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }
        // Validate URL format
        try {
            new URL(url);
        }
        catch {
            return res.status(400).json({ error: "Invalid URL" });
        }
        // If custom code is given, ensure uniqueness
        if (code) {
            const exists = await prisma.link.findUnique({ where: { code } });
            if (exists)
                return res.status(409).json({ error: "Code already exists" });
        }
        // Auto-generate code
        const shortCode = code || Math.random().toString(36).substring(2, 8);
        const newLink = await prisma.link.create({
            data: {
                url,
                code: shortCode,
            },
        });
        res.json(newLink);
    }
    catch (err) {
        console.log("CREATE LINK ERROR:", err);
        res.status(500).json({ error: "Server error" });
    }
});
// ------------------------------
// GET /api/links → LIST LINKS
// ------------------------------
router.get("/", async (req, res) => {
    try {
        const links = await prisma.link.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(links);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
// ------------------------------
// DELETE /api/links/:code → DELETE
// ------------------------------
router.delete("/:code", async (req, res) => {
    try {
        const { code } = req.params;
        await prisma.link.delete({
            where: { code },
        });
        res.json({ success: true });
    }
    catch (err) {
        res.status(404).json({ error: "Not found" });
    }
});
export default router;
