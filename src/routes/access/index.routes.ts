import express from "express";
import userAccessRouter from "./user.acccess.routes";

const acccessRouter = express.Router();

acccessRouter.use("/user", userAccessRouter);

export default acccessRouter;
