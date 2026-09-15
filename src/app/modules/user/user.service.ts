import { hashedPassword } from "./../../utils/password";
import AppError from "../../errorHelpers/appError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatusCode from "http-status-codes";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password: pass, ...rest } = payload;

  const isExist = await User.findOne({ email });

  if (isExist) {
    throw new AppError(httpStatusCode.BAD_REQUEST, "User already exist.");
  }

  const hashedPass = await hashedPassword(pass as string);

  const user = await User.create({
    email,
    password: hashedPass,
    ...rest,
  });

  const userObject = user.toObject();

  const { password, ...userWithoutPassword } = userObject;

  return userWithoutPassword;
};

export const UserServices = {
  createUser,
};
