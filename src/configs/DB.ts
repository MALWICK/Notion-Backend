import { config } from "dotenv";
import { connect } from "mongoose";
import { MONGO_URI } from "./env.configs";

config();

export const connectDB = async (): Promise<void> => {
  try {
    await connect(MONGO_URI);

    console.log("DB connected...");
  } catch (error) {
    console.error(error);

    process.exit(1);
    /*  if (error instanceof Error) {
      return handleErrors({ error, source: "CONNECT DB FUNCTION" });
    } else {
      return defaultError("CONNECT DB FUNCTION", error as string);
    } */
  }
};
