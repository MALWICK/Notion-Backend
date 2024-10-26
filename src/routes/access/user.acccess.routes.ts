import express from "express";
import {
  createUserController,
  userLoginController
} from "../../controllers/access.controllers";
import {
  validateCreateUser,
  validateUserLogin
} from "../../middlewares/validations/access.validation.middlewares";
// import { userLoginController } from "../../controllers/access.controllers";
const userAccessRouter = express.Router();

userAccessRouter.post("/create", validateCreateUser, createUserController);

userAccessRouter.post("/login", validateUserLogin, userLoginController);

export default userAccessRouter;
