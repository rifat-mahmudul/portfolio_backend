import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { EducationServices } from "./education.service";

const createEducation = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const education = await EducationServices.createEducation(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Education created successfully.",
    data: education,
  });
});

const getAllEducations = catchAsync(async (req: Request, res: Response) => {
  const educations = await EducationServices.getAllEducations();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Educations retrieved successfully.",
    data: educations,
  });
});

const getSingleEducation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const education = await EducationServices.getSingleEducation(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Education retrieved successfully.",
    data: education,
  });
});

const updateEducation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const education = await EducationServices.updateEducation(id as string, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Education updated successfully.",
    data: education,
  });
});

const deleteEducation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await EducationServices.deleteEducation(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Education deleted successfully.",
    data: null,
  });
});

export const EducationControllers = {
  createEducation,
  getAllEducations,
  getSingleEducation,
  updateEducation,
  deleteEducation,
};
