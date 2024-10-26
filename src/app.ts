import cors from "cors";
import express, { Request, Response } from "express";
import { connectDB } from "./configs/DB";
import allRouter from "./routes/index.routes";

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use("/uploads", express.static("uploads"));

app.use("/api", allRouter);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

export default app;
