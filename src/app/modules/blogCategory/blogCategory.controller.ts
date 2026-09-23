import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogCategoryServices } from "./blogCategory.service";

const createBlogCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await BlogCategoryServices.createBlogCategory(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog category created successfully.",
    data: category,
  });
});

const getAllBlogCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await BlogCategoryServices.getAllBlogCategories();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog categories retrieved successfully.",
    data: categories,
  });
});

const getSingleBlogCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await BlogCategoryServices.getSingleBlogCategory(id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Blog category retrieved successfully.",
      data: category,
    });
  },
);

const updateBlogCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await BlogCategoryServices.updateBlogCategory(id as string, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog category updated successfully.",
    data: category,
  });
});

const deleteBlogCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await BlogCategoryServices.deleteBlogCategory(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog category deleted successfully.",
    data: null,
  });
});

export const BlogCategoryControllers = {
  createBlogCategory,
  getAllBlogCategories,
  getSingleBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
