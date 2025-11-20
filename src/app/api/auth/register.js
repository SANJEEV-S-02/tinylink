import prisma from '../lib/prisma.js';
import bcrypt from "bcryptjs";
export const registerUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (!email || !password || !confirmPassword)
            return res.status(400).json({ error: "All fields required" });
        if (password !== confirmPassword)
            return res.status(400).json({ error: "Passwords do not match" });
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists)
            return res.status(400).json({ error: "User already exists" });
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashed },
        });
        return res.status(201).json({ success: true, user });
    }
    catch (e) {
        console.log("REGISTER ERROR:", e);
        res.status(500).json({ error: "Server error" });
    }
};
