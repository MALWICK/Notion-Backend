import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI as string;
export const PORT = process.env.PORT || 6173;
export const USER_TBL = process.env.USER_TBL as string;
