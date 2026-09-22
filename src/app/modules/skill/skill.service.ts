import mongoose from "mongoose";
import httpStatus from "http-status-codes";
import { Skill } from "./skill.model";
import { ISkill } from "./skill.interface";
import AppError from "../../errorHelpers/appError";

const createSkill = async (payload: Partial<ISkill>) => {
  const existingSkill = await Skill.findOne({
    name: payload.name,
  });

  if (existingSkill) {
    throw new AppError(httpStatus.CONFLICT, "Skill already exists.");
  }

  const skill = await Skill.create(payload);

  return skill;
};

const getAllSkills = async () => {
  const skills = await Skill.find().sort({
    category: 1,
    name: 1,
  });

  return skills;
};

const getSingleSkill = async (skillId: string) => {
  if (!mongoose.isValidObjectId(skillId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid skill id.");
  }

  const skill = await Skill.findById(skillId);

  if (!skill) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found.");
  }

  return skill;
};

const updateSkill = async (skillId: string, payload: Partial<ISkill>) => {
  if (!mongoose.isValidObjectId(skillId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid skill id.");
  }

  const skill = await Skill.findById(skillId);

  if (!skill) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found.");
  }

  if (payload.name) {
    const existingSkill = await Skill.findOne({
      name: payload.name,
      _id: { $ne: skillId },
    });

    if (existingSkill) {
      throw new AppError(httpStatus.CONFLICT, "Skill already exists.");
    }
  }

  const updatedSkill = await Skill.findByIdAndUpdate(skillId, payload, {
    new: true,
    runValidators: true,
  });

  return updatedSkill;
};

const deleteSkill = async (skillId: string) => {
  if (!mongoose.isValidObjectId(skillId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid skill id.");
  }

  const deletedSkill = await Skill.findByIdAndDelete(skillId);

  if (!deletedSkill) {
    throw new AppError(httpStatus.NOT_FOUND, "Skill not found.");
  }
};

export const SkillServices = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
