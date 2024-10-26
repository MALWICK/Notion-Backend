import { Request, Response } from "express";
import { defaultError, handleErrors } from "../helpers/errorHandler";
import { createUserService } from "../services/user.services";
import { CreateUserBodyType } from "../types/user.types";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const body: CreateUserBodyType = req.body;

    const response = await createUserService(body);

    if (
      (response?.data === null || response?.errorMessage) &&
      response?.status &&
      response?.status >= 300
    ) {
      handleErrors({ response, res });
      return;
    }

    res.status(response!.status).send(response!.data);
  } catch (error) {
    if (error instanceof Error) {
      handleErrors({
        res,
        error,
        source: "OFFICE PERSONNEL LOGIN CONTROLLER"
      });
      return;
    } else {
      defaultError("OFFICE PERSONNEL LOGIN CONTROLLER", error as string);
      return;
    }
  }
};
/* export const userLoginController = async (
  req: Request,
  res: Response
): Promise<ControllerReturn> => {
  try {
    const body: OfficePersonnelLogin = req.body;

    const response = await OfficePersonnelLoginService(body);

    if (
      (response?.data === null || response?.errorMessage) &&
      response?.status &&
      response?.status >= 300
    )
      return handleErrors({ response, res });

    const { accessToken, refreshToken } = response.data as Token;

    const cookie: CookieOptions = {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none"
    };

    res.cookie("jwt", refreshToken, cookie);
    res.status(response.status).send(accessToken);
  } catch (error) {
    if (error instanceof Error) {
      return handleErrors({
        res,
        error,
        source: "OFFICE PERSONNEL LOGIN CONTROLLER"
      });
    } else {
      return defaultError("OFFICE PERSONNEL LOGIN CONTROLLER", error as string);
    }
  }
};
 */
