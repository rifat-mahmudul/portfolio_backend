import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ProfileServices } from "./profile.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createProfile = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await ProfileServices.createProfile(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Profile created successfully.",
    data: result,
  });
});

export const ProfileControllers = {
  createProfile,
};
