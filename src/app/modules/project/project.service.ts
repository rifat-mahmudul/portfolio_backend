import { IProject } from "./project.interface";
import { Project } from "./project.model";

const createProject = async (payload: Partial<IProject>) => {
  const project = await Project.create(payload);

  return project;
};

const getAllProjects = async () => {
  const projects = await Project.find().select("-sections");

  return projects;
};

export const ProjectServices = {
  createProject,
  getAllProjects
};
