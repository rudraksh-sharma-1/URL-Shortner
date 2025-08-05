import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Config/db.js';


import urlRoutes from './Routes/urlRoutes.js'
import authRoutes from "./Routes/authRoutes.js";


dotenv.config();
connectDB();

const allowedOrigins = [
    "http://localhost:5173", // local dev
    "https://rudraksh-url-shortner.vercel.app", // deployed frontend
];

const app = express();
app.use(cors({
    origin: allowedOrigins,
     methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());


app.use("/", urlRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
