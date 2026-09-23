import mongoose from "mongoose";
import AppError from "../../errorHelpers/appError";
import { IProject } from "./project.interface";
import { Project } from "./project.model";
import httpStatus from "http-status-codes";
import { generateSlug } from "../../utils/slug";
import {
  deleteImageFromCloudinary,
  getPublicIdFromUrl,
} from "../../config/cloudinary.config";

const createProject = async (payload: Partial<IProject>) => {
  const project = await Project.create(payload);

  return project;
};

const getAllProjects = async () => {
  const projects = await Project.find().select("-sections");

  return projects;
};

const getSingleProject = async (slug: string) => {
  const project = await Project.findOne({ slug });

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found.");
  }

  return project;
};

const updateProject = async (projectId: string, payload: Partial<IProject>) => {
  if (!mongoose.isValidObjectId(projectId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid project id.");
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found.");
  }

  if (payload.title) {
    payload.slug = generateSlug(payload.title);
  }

  const updatedProject = await Project.findByIdAndUpdate(projectId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedProject;
};

const deleteProject = async (projectId: string) => {
  if (!mongoose.isValidObjectId(projectId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid project id.");
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found.");
  }

  if (project.thumbnail) {
    const publicId = getPublicIdFromUrl(project.thumbnail);

    await deleteImageFromCloudinary(publicId);
  }

  if (project.images?.length) {
    for (const image of project.images) {
      const publicId = getPublicIdFromUrl(image);

      await deleteImageFromCloudinary(publicId);
    }
  }

  await Project.findByIdAndDelete(projectId);
};

export const ProjectServices = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
