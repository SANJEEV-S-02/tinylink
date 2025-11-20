import prisma from '../lib/prisma.js';
import bcrypt from "bcryptjs";
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(400).json({ error: "User not found" });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(400).json({ error: "Invalid password" });
        return res.status(200).json({
            success: true,
            user: { id: user.id, email: user.email },
        });
    }
    catch (e) {
        console.error("LOGIN ERROR:", e);
        res.status(500).json({ error: "Server error" });
    }
};
