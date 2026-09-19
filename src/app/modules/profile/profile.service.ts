import AppError from "../../errorHelpers/appError";
import { IProfile } from "./profile.interface";
import { Profile } from "./profile.model";
import httpStatus from "http-status-codes";

const createProfile = async (payload: Partial<IProfile>) => {
  const isExist = await Profile.findOne();
  
  if (isExist) {
    throw new AppError(httpStatus.CONFLICT, "Profile already exists.");
  }

  const profile = await Profile.create(payload);

  return profile;
};

export const ProfileServices = {
  createProfile,
};
