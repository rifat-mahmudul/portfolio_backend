import httpStatusCode from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { comparePassword } from "../../utils/password";
import { createUserTokens } from "../../utils/userTokens";

const login = async (payload: Partial<IUser>) => {
  const { email, password: pass } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(
      httpStatusCode.BAD_REQUEST,
      "Invalid email or password.",
    );
  }

  if (user.isActive !== "ACTIVE") {
    throw new AppError(
      httpStatusCode.UNAUTHORIZED,
      "Your account is not active.",
    );
  }

  //   if (!user.isVerified) {
  //     throw new AppError(
  //       httpStatusCode.FORBIDDEN,
  //       "You are not verified. Please verify your account",
  //     );
  //   }

  const isPassMatch = await comparePassword(pass as string, user.password);

  if (!isPassMatch) {
    throw new AppError(httpStatusCode.BAD_REQUEST, "Incorrect Password");
  }

  const userTokens = createUserTokens(user);

  const userObject = user.toObject();

  const { password, ...userWithoutPassword } = userObject;

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: userWithoutPassword,
  };
};

export const AuthServices = {
  login,
};
