import { ErrorProps, ErrorResponse } from "../types/error.types";

export const handleErrors = <T>({
  response,
  res,
  error,
  source,
  status
}: Partial<ErrorProps<T>>): ErrorResponse<null> | null => {
  // console.log(response || error);

  if (!res)
    return !error
      ? (response as ErrorResponse<null>)
      : {
          data: null,
          errorMessage: error.message,
          source: source as string,
          status: 500
        };

  let selStatus = error ? status : (response?.status as number);

  if (typeof selStatus !== "number") selStatus = 500;

  if (selStatus < 500) {
    res
      .status(selStatus)
      .send(response ? response.errorMessage : error?.message);

    return null;
  }

  console.log(response || error);

  console.log(selStatus);

  res.sendStatus(selStatus as number);
  return null;
};

export const defaultError = (
  source: string,
  error: string
): ErrorResponse<null> => {
  return {
    data: null,
    errorMessage: error ? error : "An unknown error occurred",
    source: source,
    status: 500
  };
};
