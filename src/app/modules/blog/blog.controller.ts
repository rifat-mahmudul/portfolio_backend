import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const authorId = req.user.userId;

  const blog = await BlogServices.createBlog(req.body, authorId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog created successfully.",
    data: blog,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogServices.getAllBlogs();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully.",
    data: blogs,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const blog = await BlogServices.getSingleBlog(slug as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully.",
    data: blog,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = await BlogServices.updateBlog(id as string, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog updated successfully.",
    data: blog,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await BlogServices.deleteBlog(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully.",
    data: null,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
