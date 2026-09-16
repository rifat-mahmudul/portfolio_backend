import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie";

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await AuthServices.login({ email, password });

  setAuthCookie(res, {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: "Login successful.",
    data: result,
  });
});

export const AuthControllers = {
  login,
};
