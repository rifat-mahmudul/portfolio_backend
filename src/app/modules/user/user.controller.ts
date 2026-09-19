import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes";

const createUser = catchAsync(
  async (req: Request, res: Response) => {
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

const updateUser = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const decodedToken = req.user;
    const payload = req.body;

    const result = await UserServices.updateUser(userId as string, decodedToken, payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "User updated successfully.",
      data: result,
    });
  },
);

const getMe = catchAsync(
  async (req: Request, res: Response) => {
    const decodedToken = req.user;

    const result = await UserServices.getMe(decodedToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "User retrieved successfully.",
      data: result,
    });
  },
);

export const UserControllers = {
  createUser,
  updateUser,
  getMe
};
