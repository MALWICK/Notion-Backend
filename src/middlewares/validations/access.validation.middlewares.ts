import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";
import { createUserSchema } from "../../configs/yup.schemas/access.yup.shemas";

export const validateCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const inputs = req.body;

    if (!inputs) {
      res.status(400).send("Send Required Fields");

      return;
    }

    await createUserSchema.validate(inputs);

    next();
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      console.log(err.errors[0]);

      res.status(400).send(err.errors[0].replace(/"|_/g, ""));
    }
  }
};
