import express from "express";
import acccessRouter from "./access/index.routes";

const allRouter = express.Router();

allRouter.use("/access", acccessRouter);

export default allRouter;
