import { compareSync, genSaltSync, hashSync } from "bcryptjs";

const saltRounds = 10;

export const hashPassword = (password: string) => {
  const salt = genSaltSync(saltRounds);

  // console.log(password, salt);
  return hashSync(password, salt);
};

export const comparePassword = (plain: string, hashed: string) => {
  return compareSync(plain, hashed);
};
