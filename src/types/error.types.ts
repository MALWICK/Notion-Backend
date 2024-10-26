import { Response } from "express";
import { DefaultReturnObj } from "./general.types";

export type ErrorResponse<T = null> = {
  data: T;
  status: number;
  errorMessage: string;
  source: string;
};

export type HandleErrorReturn = DefaultReturnObj<null>;

export type ErrorProps<T = string> = {
  response: DefaultReturnObj<T>;
  res: Response;
  error: Error;
  source: string;
  status: number;
};

// export type ErrorHandlerReturn = Omit<DefaultReturnObj<null>, "status"> | null;
export type ErrorHandlerReturn = DefaultReturnObj<null> | null;

/* export type HandleError<T> = (
  response: Partial<ErrorResponse<T>>,
  res: Response | null,
  error: Error | null
) => Omit<ErrorResponse, "status"> | null; */
