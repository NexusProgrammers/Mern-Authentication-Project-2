import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRoute.js";
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
dotenv.config({
  path: "./config/config.env",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/users", userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
