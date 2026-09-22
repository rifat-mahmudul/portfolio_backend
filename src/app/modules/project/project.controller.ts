import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ProjectServices } from "./project.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

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

export const ProjectControllers = {
  createProject,
  getAllProjects,
};
