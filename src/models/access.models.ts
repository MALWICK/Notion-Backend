import { defaultError, handleErrors } from "../helpers/errorHandler";
import { ModelReturn } from "../types/general.types";
import { CreateUserBodyType, UserTblType } from "../types/user.types";
import { UserTbl } from "./mongoDB.models";

export const checkUserModel = async ({
  email,
  username
}: Omit<
  CreateUserBodyType,
  "full_name" | "password"
>): ModelReturn<UserTblType | null> => {
  try {
    const adminExisting = await UserTbl.findOne({
      $or: [{ email }, { username }]
    });

    return {
      data: adminExisting,
      errorMessage: "",
      source: "CHECK USER MODEL",
      status: 200
    };
  } catch (error) {
    if (error instanceof Error) {
      return handleErrors({ error, source: "CHECK USER MODEL" });
    } else {
      return defaultError("CHECK USER MODEL", error as string);
    }
  }
};

export const createUserModel = async (
  userData: CreateUserBodyType
): ModelReturn<UserTblType | null> => {
  try {
    const createAdmin = await UserTbl.create({
      ...userData
    });

    return {
      data: createAdmin,
      errorMessage: "",
      source: "CREATE USER MODEL",
      status: 200
    };
  } catch (error) {
    if (error instanceof Error) {
      return handleErrors({ error, source: "CREATE USER MODEL" });
    } else {
      return defaultError("CREATE USER MODEL", error as string);
    }
  }
};

export const userLoginModel = async (
  user: string
): ModelReturn<UserTblType | null> => {
  try {
    const userExisting = await UserTbl.findOne(
      {
        $or: [{ email: user }, { username: user }]
      },
      { visible: 0, date_created: 0, date_updated: 0 }
    );

    return {
      data: userExisting,
      errorMessage: "",
      source: "USER LOGIN MODEL",
      status: 200
    };
  } catch (error) {
    if (error instanceof Error) {
      return handleErrors({ error, source: "USER LOGIN MODEL" });
    } else {
      return defaultError("USER LOGIN MODEL", error as string);
    }
  }
};
