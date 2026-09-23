import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ProjectServices } from "./project.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { IProject } from "./project.interface";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const payload: IProject = {
    ...req.body,
    thumbnail: files?.thumbnail?.[0]?.path,
    images: files?.images?.map((file) => file.path),
  };

  const project = await ProjectServices.createProject(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project created successfully.",
    data: project,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const projects = await ProjectServices.getAllProjects();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project retrieved successfully.",
    data: projects,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const project = await ProjectServices.getSingleProject(slug as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project retrieved successfully.",
    data: project,
  });
});

const updatedProject = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params.id;
  const payload = req.body;
  const project = await ProjectServices.updateProject(
    projectId as string,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project updated successfully.",
    data: project,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const projectId = req.params.id;
  await ProjectServices.deleteProject(projectId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project deleted successfully.",
    data: null,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjects,
  getSingleProject,
  updatedProject,
  deleteProject,
};
