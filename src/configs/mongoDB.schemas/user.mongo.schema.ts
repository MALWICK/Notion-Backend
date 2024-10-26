import { Schema } from "mongoose";

export const userSchema = new Schema({
  full_name: {
    type: String,
    required: [true, "Full name is required"],
    trim: true
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true
  },
  /* mobile: {
    type: String,
    required: [true, "mobile is required"],
    unique: true,
    trim: true
  }, */
  profile_pic: {
    type: String,
    required: [true, "Passport is required"],
    default: "/media/images/default.jpg",
    trim: true
  },
  password: {
    type: String,
    required: [true, "passowrd is required"],
    trim: true
  },
  refresh_token: { type: String, default: "" },
  password_reset_token: { type: String, default: null, trim: true },
  visible: { type: Boolean, required: true, default: true },
  date_registered: { type: Date, required: true, default: Date.now() },
  date_updated: { type: Date, required: true, default: Date.now() },
  last_active: { type: Date, required: true, default: Date.now() }
});
