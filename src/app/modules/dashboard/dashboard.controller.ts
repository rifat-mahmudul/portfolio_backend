import { Request, Response } from "express";
import { DashboardServices } from "./dashboard.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

const getDashboardStatistics = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardServices.getDashboardStatistics();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Dashboard statistics retrieved successfully.",
      data: result,
    });
  },
);

export const DashboardControllers = {
  getDashboardStatistics,
};