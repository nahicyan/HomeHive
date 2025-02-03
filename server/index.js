import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
import { buyerRoute } from './routes/buyerRoute.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8400;

// 1) Create __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// 2) Serve static "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 3) API routes
app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);
app.use('/api/buyer', buyerRoute);

// 4) Start server
app.listen(PORT, () => {
    console.log("Uploads folder path:", path.join(__dirname, "uploads"));

  console.log(`Backend is running on port ${PORT}`);
});