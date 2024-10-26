import * as Yup from "yup";
import { tldRegex } from "../RegExp";

export const createUserSchema = Yup.object({
  full_name: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string()
    .required()
    .email("Invalid email") // Validates basic email format
    .matches(tldRegex, "Domain must end with .com or .net or .mail"),
  password: Yup.string().required().min(5).max(20)
  /* .matches(
      userPasswordRegex,
      `Password must contain atleast one uppercase, one lowercase and one number`
    ) */
});
