import mongoose from "mongoose";
import AppError from "../../errorHelpers/appError";
import httpStatus from "http-status-codes";
import { BlogCategory } from "../blogCategory/blogCategory.model";
import { BlogStatus, IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const calculateReadingTime = (sections: IBlog["sections"]) => {
  const content = sections
    .map((section) => `${section.title} ${section.content}`)
    .join(" ");

  const wordCount = content.trim().split(/\s+/).length;

  return Math.max(1, Math.ceil(wordCount / 1000));
};

const validateCategory = async (categoryId: string) => {
  if (!mongoose.isValidObjectId(categoryId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid category id.");
  }

  const category = await BlogCategory.findOne({
    _id: categoryId,
    isActive: true,
  });

  if (!category) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Blog category not found or inactive.",
    );
  }

  return category;
};

const createBlog = async (payload: Partial<IBlog>, authorId: string) => {
  if (!authorId || !mongoose.isValidObjectId(authorId)) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid author.");
  }

  if (!payload.category) {
    throw new AppError(httpStatus.BAD_REQUEST, "Blog category is required.");
  }

  await validateCategory(payload.category.toString());

  const existingBlog = await Blog.findOne({
    title: payload.title,
  });

  if (existingBlog) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A blog with this title already exists.",
    );
  }

  const readingTime = calculateReadingTime(payload.sections || []);

  const blog = await Blog.create({
    ...payload,
    author: authorId,
    readingTime,
    views: 0,
    publishedAt:
      payload.status === BlogStatus.PUBLISHED ? new Date() : undefined,
  });

  return blog;
};

const getAllBlogs = async () => {
  return Blog.find({ status: BlogStatus.PUBLISHED })
    .populate("category", "name")
    .populate("author", "name email")
    .sort({ publishedAt: -1 });
};

const getSingleBlog = async (slug: string) => {
  const blog = await Blog.findOne({
    slug,
    status: BlogStatus.PUBLISHED,
  })
    .populate("category", "name description")
    .populate("author", "name email");

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found.");
  }

  await Blog.findByIdAndUpdate(blog._id, {
    $inc: { views: 1 },
  });

  blog.views += 1;

  return blog;
};

const updateBlog = async (blogId: string, payload: Partial<IBlog>) => {
  if (!mongoose.isValidObjectId(blogId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid blog id.");
  }

  const blog = await Blog.findById(blogId);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found.");
  }

  if (payload.category) {
    await validateCategory(payload.category.toString());
  }

  if (payload.title) {
    const existingBlog = await Blog.findOne({
      title: payload.title,
      _id: { $ne: blogId },
    });

    if (existingBlog) {
      throw new AppError(
        httpStatus.CONFLICT,
        "A blog with this title already exists.",
      );
    }
  }

  const updatedData = {
    ...blog.toObject(),
    ...payload,
  };

  if (payload.sections) {
    updatedData.readingTime = calculateReadingTime(payload.sections);
  }

  if (
    payload.status === BlogStatus.PUBLISHED &&
    blog.status !== BlogStatus.PUBLISHED
  ) {
    updatedData.publishedAt = new Date();
  }

  if (
    payload.status === BlogStatus.DRAFT &&
    blog.status === BlogStatus.PUBLISHED
  ) {
    updatedData.publishedAt = undefined;
  }

  return Blog.findByIdAndUpdate(blogId, updatedData, {
    new: true,
    runValidators: true,
  });
};

const deleteBlog = async (blogId: string) => {
  if (!mongoose.isValidObjectId(blogId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid blog id.");
  }

  const deletedBlog = await Blog.findByIdAndDelete(blogId);

  if (!deletedBlog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found.");
  }
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};
