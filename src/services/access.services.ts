import jwt from "jsonwebtoken";
import { JWT_ACCESS_KEY, REFRESH_TOKEN_KEY } from "../configs/env.configs";
import { defaultError, handleErrors } from "../helpers/errorHandler";
import {
  checkUserModel,
  createUserModel,
  userLoginModel
} from "../models/access.models";
import { ErrorResponse } from "../types/error.types";
import { DefaultReturnObj, ServiceReturn, Token } from "../types/general.types";
import {
  CreateUserBodyType,
  UserLoginBodyType,
  UserTblType
} from "../types/user.types";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";

export const createUserService = async (
  params: CreateUserBodyType
): ServiceReturn<string | null> => {
  try {
    const response = await checkUserModel(params);

    if (
      (response?.data === null || response?.errorMessage) &&
      response?.status &&
      response?.status >= 300
    )
      return response as DefaultReturnObj<null>;

    const userExist = response!.data;

    if (userExist)
      return {
        data: null,
        errorMessage: "Admin Already Exists",
        source: "CREATE USER SERVICE",
        status: 409
      };

    const hashedPassword = hashPassword(params.password);

    const response2 = (await createUserModel({
      ...params,
      password: hashedPassword
    })) as DefaultReturnObj<UserTblType | null>;

    if (
      (response2?.data === null || response2?.errorMessage) &&
      response2?.status &&
      response2?.status >= 300
    )
      return response2 as DefaultReturnObj<null>;

    const createUSer = response!.data;

    if (!createUSer)
      return {
        data: null,
        errorMessage: "Error Registering User",
        source: "CREATE USER SERVICE",
        status: 501
      };

    return {
      data: `${params.username} Registered Successfully`,
      errorMessage: "",
      source: "CREATE USER SERVICE",
      status: 200
    };
  } catch (error) {
    if (error instanceof Error) {
      return handleErrors({
        error,
        source: "CREATE USER SERVICE"
      }) as ErrorResponse;
    } else {
      return defaultError("CREATE USER SERVICE", error as string);
    }
  }

  throw null;
};

export const userLoginService = async (
  params: UserLoginBodyType
): ServiceReturn<Token | string | null> => {
  try {
    const response = await userLoginModel(params.user);

    if (
      (response?.data === null || response?.errorMessage) &&
      response?.status &&
      response?.status >= 300
    )
      return response as DefaultReturnObj<null>;

    const userExist = response!.data;

    if (!userExist)
      return {
        data: null,
        errorMessage: "Incorrect Details",
        source: "USER LOGIN SERVICE",
        status: 404
      };

    const { full_name, email, username, password, visible } = userExist;

    const verifyPassword = comparePassword(params.password, password);

    if (!verifyPassword)
      return {
        data: null,
        errorMessage: "Incorrect Details",
        source: "OFFICE PERSONNEL LOGIN SERVICE",
        status: 404
      };

    if (visible === false)
      return {
        data: null,
        errorMessage: "Account Blocked",
        source: "OFFICE PERSONNEL LOGIN SERVICE",
        status: 403
      };

    const accessToken = jwt.sign(
      {
        name: full_name,
        user: username
      },
      JWT_ACCESS_KEY
      // {
      //   expiresIn: "15s",
      // }
    );

    const refreshToken = jwt.sign(
      { name: full_name, email, username },
      REFRESH_TOKEN_KEY
      // { expiresIn: "30s" }
    );

    return {
      data: { accessToken, refreshToken },
      errorMessage: "",
      source: "USER LOGIN SERVICE",
      status: 200
    };
  } catch (error) {
    if (error instanceof Error) {
      return handleErrors({
        error,
        source: "USER LOGIN SERVICE"
      }) as ErrorResponse;
    } else {
      return defaultError("USER LOGIN SERVICE", error as string);
    }
  }

  throw null;
};
