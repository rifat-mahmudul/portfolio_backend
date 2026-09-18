import httpStatusCode from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { IsActive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { comparePassword, hashedPassword } from "../../utils/password";
import { createUserTokens } from "../../utils/userTokens";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";

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

const getNewAccessToken = async (refreshToken: string) => {
  const verifyRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET,
  ) as JwtPayload;

  const isExist = await User.findOne({ email: verifyRefreshToken.email });

  if (!isExist) {
    throw new AppError(httpStatusCode.UNAUTHORIZED, "User doesn't exist.");
  }

  if (
    isExist.isActive === IsActive.BLOCKED ||
    isExist.isActive === IsActive.INACTIVE
  ) {
    throw new AppError(
      httpStatusCode.BAD_REQUEST,
      `User is ${isExist.isActive}`,
    );
  }

  //   if (!user.isVerified) {
  //     throw new AppError(
  //       httpStatusCode.FORBIDDEN,
  //       "You are not verified. Please verify your account",
  //     );
  //   }

  const jwtPayload = {
    userId: isExist._id,
    email: isExist.email,
    role: isExist.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES,
  );

  return accessToken;
};

const changePassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload,
) => {
  const user = await User.findById(decodedToken.userId);

  if (!user) {
    throw new AppError(httpStatusCode.NOT_FOUND, "User not found");
  }

  const isOldPassMatch = await comparePassword(oldPassword, user.password);

  if (!isOldPassMatch) {
    throw new AppError(
      httpStatusCode.UNAUTHORIZED,
      "Old Password does not match",
    );
  }

  if (!newPassword) {
    throw new AppError(httpStatusCode.BAD_REQUEST, "Please enter new password");
  }

  const newHashedPass = await hashedPassword(newPassword);

  const isSamePassword = await comparePassword(newPassword, user.password);

  if (isSamePassword) {
    throw new AppError(
      httpStatusCode.BAD_REQUEST,
      "Can't use previous password. Please enter a new password.",
    );
  }

  user.password = newHashedPass;

  await user.save();
};

const forgotPassword = async (email: string) => {
  const isExist = await User.findOne({ email });

  if (!isExist) {
    throw new AppError(httpStatusCode.BAD_REQUEST, "User does not exist");
  }

  // if (!isExist.isVerified) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "User is not verified. Please verify your account.",
  //   );
  // }

  if (
    isExist.isActive === IsActive.BLOCKED ||
    isExist.isActive === IsActive.INACTIVE
  ) {
    throw new AppError(
      httpStatusCode.BAD_REQUEST,
      `User is ${isExist.isActive}`,
    );
  }

  const jwtPayload = {
    userId: isExist._id,
    email: isExist.email,
    role: isExist.role,
  };

  const resetToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES,
  );

  const resetULRLink = `${envVars.FRONTEND_URL}/reset-password?id=${isExist._id}&token=${resetToken}`;

  sendEmail({
    to: isExist.email,
    subject: "Password Reset",
    templateName: "forgetPassword",
    templateData: {
      name: isExist.name,
      resetULRLink,
    },
  });
};

export const AuthServices = {
  login,
  getNewAccessToken,
  changePassword,
  forgotPassword
};
