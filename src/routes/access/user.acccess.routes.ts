import express from "express";
import { createUserController } from "../../controllers/access.controllers";
import { validateCreateUser } from "../../middlewares/validations/access.validation.middlewares";
// import { userLoginController } from "../../controllers/access.controllers";
const userAccessRouter = express.Router();

// userAccessRouter.post("/login", userLoginController);

userAccessRouter.post("/create", validateCreateUser, createUserController);

export default userAccessRouter;
