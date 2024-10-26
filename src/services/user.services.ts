import { defaultError, handleErrors } from "../helpers/errorHandler";
import { checkUserModel, createUserModel } from "../models/user.models";
import { ErrorResponse } from "../types/error.types";
import { DefaultReturnObj, ServiceReturn } from "../types/general.types";
import { CreateUserBodyType } from "../types/user.types";
import { hashPassword } from "../utils/bcrypt.utils";
import { UserTblType } from "./../types/user.types";

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

    const adminExisting = response!.data;

    if (adminExisting)
      return {
        data: null,
        errorMessage: "Admin Already Exists",
        source: "CHECK ADMIN SERVICE",
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

    return {
      data: `${params.username} Registered Successfully`,
      errorMessage: "",
      source: "OFFICE PERSONNEL LOGIN SERVICE",
      status: 200
    };
  } catch (error) {
    if (error instanceof Error) {
      return handleErrors({
        error,
        source: "OFFICE PERSONNEL LOGIN SERVICE"
      }) as ErrorResponse;
    } else {
      return defaultError("OFFICE PERSONNEL LOGIN SERVICE", error as string);
    }
  }

  throw null;
};
