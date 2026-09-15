import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await UserServices.createUser(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "User registered successfully.",
      data: result,
    });
  },
);

export const UserControllers = {
  createUser,
};
