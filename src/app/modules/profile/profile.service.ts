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

const updateProfile = async (payload: Partial<IProfile>) => {
  const profile = await Profile.findOne();

  if (!profile) {
    throw new AppError(httpStatus.BAD_REQUEST, "No profile found.");
  }

  const updateProfile = await Profile.findByIdAndUpdate(profile._id, payload, {
    new: true,
    runValidators: true,
  });

  return updateProfile;
};

export const ProfileServices = {
  createProfile,
  updateProfile,
};
