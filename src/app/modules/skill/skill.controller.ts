import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SkillServices } from "./skill.service";

const createSkill = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const skill = await SkillServices.createSkill(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Skill created successfully.",
    data: skill,
  });
});

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const skills = await SkillServices.getAllSkills();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skills retrieved successfully.",
    data: skills,
  });
});

const getSingleSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const skill = await SkillServices.getSingleSkill(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill retrieved successfully.",
    data: skill,
  });
});

const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const skill = await SkillServices.updateSkill(id as string, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill updated successfully.",
    data: skill,
  });
});

const deleteSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await SkillServices.deleteSkill(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Skill deleted successfully.",
    data: null,
  });
});

export const SkillControllers = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
