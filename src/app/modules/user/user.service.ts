import { hashedPassword } from "./../../utils/password";
import AppError from "../../errorHelpers/appError";
import { IsActive, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatusCode from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

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

const getMe = async (decodedToken: JwtPayload) => {
  const userId = decodedToken.userId;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatusCode.BAD_REQUEST, "User not found.");
  }

  const userObject = user.toObject();
  const { password, ...userWithoutPass } = userObject;

  return userWithoutPass;
};

export const UserServices = {
  createUser,
  getMe,
};
