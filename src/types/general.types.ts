import { Request } from "express";

export type DefaultReturnObj<T> = {
  // data: QueryResult;
  data: T;
  errorMessage: null | string;
  source: string;
  status: number;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] }; // For multiple files
  file?: Express.Multer.File; // For single file
}

export type ControllerReturn = Promise<
  Omit<DefaultReturnObj<null>, "status"> | null | undefined
>;

export type ServiceReturn<T> = Promise<DefaultReturnObj<T> | null>;

export type ModelReturn<T = string> = Promise<DefaultReturnObj<T> | null>;
