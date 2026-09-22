import { IProject } from "./project.interface";
import { Project } from "./project.model";

const createProject = async (payload: Partial<IProject>) => {
  const project = await Project.create(payload);

  return project;
};

export const ProjectServices = {
  createProject,
};
