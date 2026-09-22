import mongoose from "mongoose";
import httpStatus from "http-status-codes";

import { Education } from "./education.model";
import { IEducation } from "./education.interface";
import AppError from "../../errorHelpers/appError";

const createEducation = async (payload: Partial<IEducation>) => {
  const education = await Education.create(payload);

  return education;
};

const getAllEducations = async () => {
  const educations = await Education.find().sort({
    startDate: -1,
  });

  return educations;
};

const getSingleEducation = async (educationId: string) => {
  if (!mongoose.isValidObjectId(educationId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid education id.");
  }

  const education = await Education.findById(educationId);

  if (!education) {
    throw new AppError(httpStatus.NOT_FOUND, "Education not found.");
  }

  return education;
};

const updateEducation = async (
  educationId: string,
  payload: Partial<IEducation>,
) => {
  if (!mongoose.isValidObjectId(educationId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid education id.");
  }

  const education = await Education.findById(educationId);

  if (!education) {
    throw new AppError(httpStatus.NOT_FOUND, "Education not found.");
  }

  const updatedData = {
    ...education.toObject(),
    ...payload,
  };

  if (updatedData.isCurrent && updatedData.endDate) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "End date cannot be provided for current education.",
    );
  }

  if (!updatedData.isCurrent && !updatedData.endDate) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "End date is required when education is not current.",
    );
  }

  if (
    updatedData.endDate &&
    new Date(updatedData.startDate) >= new Date(updatedData.endDate)
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "End date must be after start date.",
    );
  }

  const updatedEducation = await Education.findByIdAndUpdate(
    educationId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedEducation;
};

const deleteEducation = async (educationId: string) => {
  if (!mongoose.isValidObjectId(educationId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid education id.");
  }

  const deletedEducation = await Education.findByIdAndDelete(educationId);

  if (!deletedEducation) {
    throw new AppError(httpStatus.NOT_FOUND, "Education not found.");
  }
};

export const EducationServices = {
  createEducation,
  getAllEducations,
  getSingleEducation,
  updateEducation,
  deleteEducation,
};
