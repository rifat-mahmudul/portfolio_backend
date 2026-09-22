import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ExperienceServices } from "./experience.service";

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const experience = await ExperienceServices.createExperience(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Experience created successfully.",
    data: experience,
  });
});

const getAllExperiences = catchAsync(async (req: Request, res: Response) => {
  const experiences = await ExperienceServices.getAllExperiences();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Experiences retrieved successfully.",
    data: experiences,
  });
});

const getSingleExperience = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const experience = await ExperienceServices.getSingleExperience(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Experience retrieved successfully.",
    data: experience,
  });
});

const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const experience = await ExperienceServices.updateExperience(
    id as string,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Experience updated successfully.",
    data: experience,
  });
});

export const ExperienceControllers = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
};
