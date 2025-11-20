import express from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
const router = express.Router();
function auth(req) {
    const token = req.cookies?.token;
    if (!token)
        return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
    catch {
        return null;
    }
}
router.post("/", async (req, res) => {
    const user = auth(req);
    if (!user)
        return res.status(401).json({ error: "Not logged in" });
    const { url, code } = req.body;
    if (!url)
        return res.status(400).json({ error: "URL required" });
    const finalCode = code || Math.random().toString(36).substring(2, 8);
    const exists = await prisma.link.findUnique({
        where: { code: finalCode }
    });
    if (exists)
        return res.status(409).json({ error: "Code exists" });
    const created = await prisma.link.create({
        data: {
            targetUrl: url, // ⭐ FIXED
            code: finalCode,
            userId: Number(user.id) // ⭐ FIXED
        },
    });
    res.json(created);
});
export default router;
