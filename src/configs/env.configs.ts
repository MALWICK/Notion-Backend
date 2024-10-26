import dotenv from "dotenv";

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI as string;
export const PORT = process.env.PORT || 6173;
export const USER_TBL = process.env.USER_TBL as string;
export const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY as string;
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY as string;
export const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY as string;
