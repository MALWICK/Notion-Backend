import { Response } from "express";

export type ErrorResponse<T = null> = {
  data: T;
  status: number;
  errorMessage: string;
  source: string;
};

export type HandleErrorReturn = ErrorResponse;

export type ErrorProps<T = string> = {
  response: ErrorResponse<T>;
  res: Response;
  error: Error;
  source: string;
  status: number;
};

// export type ErrorHandlerReturn = Omit<ErrorResponse<null>, "status"> | null;
export type ErrorHandlerReturn = ErrorResponse<null> | null;

/* export type HandleError<T> = (
  response: Partial<ErrorResponse<T>>,
  res: Response | null,
  error: Error | null
) => Omit<ErrorResponse, "status"> | null; */
