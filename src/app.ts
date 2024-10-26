import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { connectDB } from "./configs/DB";
import { SESSION_SECRET_KEY } from "./configs/env.configs";
import allRouter from "./routes/index.routes";

connectDB();

const app = express();

// Middleware
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(SESSION_SECRET_KEY));
// app.use("/uploads", express.static("uploads"));

app.use("/api", allRouter);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

export default app;
