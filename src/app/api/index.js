import { registerUser } from "./auth/register.js";
import { loginUser } from "./auth/login.js";
import linksRoute from "./links/index.js";
import redirectRoute from "./links/redirect.js";
import express from 'express';
import cors from 'cors';

const app = express();

// 1) BODY PARSER (MUST BE FIRST)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2) ENABLE PROXY FOR RENDER
app.enable('trust proxy');

// 3) CORS (VERY IMPORTANT: MUST COME BEFORE ROUTES)
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://tinylink02.vercel.app'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  })
);

// 4) ROUTES (NOW CORS WILL WORK)
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);

app.use('/api/links', linksRoute);
app.use('/', redirectRoute);

app.listen(5001, () => console.log('API running'));
