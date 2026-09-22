import mongoose from "mongoose";
import httpStatus from "http-status-codes";

import { IExperience } from "./experience.interface";
import { Experience } from "./experience.model";
import AppError from "../../errorHelpers/appError";

const createExperience = async (payload: Partial<IExperience>) => {
  const experience = await Experience.create(payload);

  return experience;
};

const getAllExperiences = async () => {
  const experiences = await Experience.find().sort({
    startDate: -1,
  });

  return experiences;
};

const getSingleExperience = async (experienceId: string) => {
  if (!mongoose.isValidObjectId(experienceId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid experience id.");
  }

  const experience = await Experience.findById(experienceId);

  if (!experience) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience not found.");
  }

  return experience;
};

const updateExperience = async (
  experienceId: string,
  payload: Partial<IExperience>,
) => {
  if (!mongoose.isValidObjectId(experienceId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid experience id.");
  }

  const experience = await Experience.findById(experienceId);

  if (!experience) {
    throw new AppError(httpStatus.NOT_FOUND, "Experience not found.");
  }

  const updatedExperience = await Experience.findByIdAndUpdate(
    experienceId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedExperience;
};

export const ExperienceServices = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
};
