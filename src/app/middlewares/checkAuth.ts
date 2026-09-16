import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import { JwtPayload } from "jsonwebtoken";
import { IsActive } from "../modules/user/user.interface";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized.");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET,
      ) as JwtPayload;

      const isExist = await User.findOne({ email: verifiedToken.email });

      if (!isExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
      }

      if (!isExist.isVerified) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
      }

      if (
        isExist.isActive === IsActive.BLOCKED ||
        isExist.isActive === IsActive.INACTIVE
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `User is ${isExist.isActive}`,
        );
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You do not have permission to access this resource.",
        );
      }

      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log("jwt error", error);
      next(error);
    }
  };
