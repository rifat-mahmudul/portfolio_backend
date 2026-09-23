import mongoose from "mongoose";
import httpStatus from "http-status-codes";

import { BlogCategory } from "./blogCategory.model";
import { IBlogCategory } from "./blogCategory.interface";
import AppError from "../../errorHelpers/appError";

const createBlogCategory = async (payload: Partial<IBlogCategory>) => {
  const existingCategory = await BlogCategory.findOne({
    name: payload.name,
  });

  if (existingCategory) {
    throw new AppError(httpStatus.CONFLICT, "Blog category already exists.");
  }

  return BlogCategory.create(payload);
};

const getAllBlogCategories = async () => {
  return BlogCategory.find().sort({
    createdAt: -1,
  });
};

const getSingleBlogCategory = async (categoryId: string) => {
  if (!mongoose.isValidObjectId(categoryId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid blog category id.");
  }

  const category = await BlogCategory.findById(categoryId);

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog category not found.");
  }

  return category;
};

const updateBlogCategory = async (
  categoryId: string,
  payload: Partial<IBlogCategory>,
) => {
  if (!mongoose.isValidObjectId(categoryId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid blog category id.");
  }

  const category = await BlogCategory.findById(categoryId);

  if (!category) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog category not found.");
  }

  if (payload.name) {
    const existingCategory = await BlogCategory.findOne({
      name: payload.name,
      _id: { $ne: categoryId },
    });

    if (existingCategory) {
      throw new AppError(httpStatus.CONFLICT, "Blog category already exists.");
    }
  }

  return BlogCategory.findByIdAndUpdate(categoryId, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteBlogCategory = async (categoryId: string) => {
  if (!mongoose.isValidObjectId(categoryId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid blog category id.");
  }

  const deletedCategory = await BlogCategory.findByIdAndDelete(categoryId);

  if (!deletedCategory) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog category not found.");
  }
};

export const BlogCategoryServices = {
  createBlogCategory,
  getAllBlogCategories,
  getSingleBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
