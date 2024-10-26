import { InferSchemaType } from "mongoose";
import { userSchema } from "../configs/mongoDB.schemas/user.mongo.schema";

export type UserTblType = InferSchemaType<typeof userSchema>;

export type CreateUserBodyType = {
  full_name: string;
  username: string;
  email: string;
  password: string;
};

export type UserLoginBodyType = {
  user: string;
  password: string;
};
