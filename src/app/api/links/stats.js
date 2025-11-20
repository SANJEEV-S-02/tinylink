import express from "express";
import prisma from "../lib/prisma";
const router = express.Router();
router.get("/:code", async (req, res) => {
    const { code } = req.params;
    const link = await prisma.link.findUnique({ where: { code } });
    if (!link)
        return res.status(404).json({ error: "Not found" });
    res.json(link);
});
export default router;
