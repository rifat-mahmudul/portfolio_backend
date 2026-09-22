import AppError from "../../errorHelpers/appError";
import { IProject } from "./project.interface";
import { Project } from "./project.model";
import httpStatus from "http-status-codes"

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

export const ProjectServices = {
  createProject,
  getAllProjects,
  getSingleProject,
};
