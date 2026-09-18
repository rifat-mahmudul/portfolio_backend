import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie";
import AppError from "../../errorHelpers/appError";
import { JwtPayload } from "jsonwebtoken";

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

const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(
      httpStatusCode.BAD_REQUEST,
      "No refresh token received from cookies",
    );
  }

  const tokenInfo = await AuthServices.getNewAccessToken(
    refreshToken as string,
  );

  setAuthCookie(res, { accessToken: tokenInfo });

  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: "New Access Token Retrieved Successfully",
    data: tokenInfo,
  });
});

const logOut = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: "User Logged Out Successfully",
    data: null,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const decodedToken = req.user;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  await AuthServices.changePassword(oldPassword, newPassword, decodedToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: "Password Changed Successfully",
    data: null,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  await AuthServices.forgotPassword(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: "Email Sent Successfully",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const authorization = req.headers.authorization;

  await AuthServices.resetPassword(req.body, authorization as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatusCode.OK,
    message: "Password changed Successfully",
    data: null,
  });
});

export const AuthControllers = {
  login,
  getNewAccessToken,
  logOut,
  changePassword,
  forgotPassword,
  resetPassword
};
