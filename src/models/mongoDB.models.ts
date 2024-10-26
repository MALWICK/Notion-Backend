import { model } from "mongoose";
import { USER_TBL } from "../configs/env.configs";
import { userSchema } from "../configs/mongoDB.schemas/user.mongo.schema";

export const UserTbl = model(USER_TBL, userSchema);
