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

const getBlogAnalytics = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardServices.getBlogAnalytics();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Blog analytics retrieved successfully.",
      data: result,
    });
  },
);

const getMostViewedBlogs = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardServices.getMostViewedBlogs();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Most viewed blogs retrieved successfully.",
      data: result,
    });
  },
);

export const DashboardControllers = {
  getDashboardStatistics,
  getBlogAnalytics, 
  getMostViewedBlogs
};