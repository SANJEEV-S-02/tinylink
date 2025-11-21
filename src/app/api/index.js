import express from "express";
import cors from "cors";

import { registerUser } from "./auth/register.js";
import { loginUser } from "./auth/login.js";
import linksRoute from "./links/index.js";
import redirectRoute from "./links/redirect.js";

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://tinylink02.vercel.app/'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());

// AUTH
app.post("/api/auth/register", registerUser);
app.post("/api/auth/login", loginUser);

// LINKS
app.use("/api/links", linksRoute);

// REDIRECT
app.use("/", redirectRoute);

app.listen(5001, () => console.log("API running at http://localhost:5001"));
