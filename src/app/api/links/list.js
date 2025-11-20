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
router.get("/", async (req, res) => {
    const user = auth(req);
    if (!user)
        return res.status(401).json({ error: "Not logged in" });
    const links = await prisma.link.findMany({
        where: { userId: Number(user.id) }, // FIXED
        orderBy: { createdAt: "desc" },
    });
    res.json(links);
});
export default router;
