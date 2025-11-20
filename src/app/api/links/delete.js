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
router.delete("/:code", async (req, res) => {
    const user = auth(req);
    if (!user)
        return res.status(401).json({ error: "Not logged in" });
    const { code } = req.params;
    const exists = await prisma.link.findUnique({
        where: { code },
    });
    if (!exists)
        return res.status(404).json({ error: "Link not found" });
    if (exists.userId !== Number(user.id))
        return res.status(403).json({ error: "Not allowed" });
    await prisma.link.delete({ where: { code } });
    res.json({ success: true });
});
export default router;
