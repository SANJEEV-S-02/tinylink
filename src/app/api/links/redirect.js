import express from "express";
import prisma from '../lib/prisma.js';
const router = express.Router();
router.get("/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const link = await prisma.link.findUnique({ where: { code } });
        if (!link) {
            return res.status(404).json({ error: "Not found" });
        }
        // Update click count
        await prisma.link.update({
            where: { code },
            data: {
                clicks: { increment: 1 },
                lastClicked: new Date(),
            },
        });
        res.json({ url: link.url });
    }
    catch (e) {
        res.status(500).json({ error: "Server error" });
    }
});
export default router;
