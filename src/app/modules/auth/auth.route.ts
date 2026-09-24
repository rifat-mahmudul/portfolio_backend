import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { authRateLimiter } from "../../middlewares/rateLimiter";

const router = Router();

router.post("/login", authRateLimiter, AuthControllers.login);
router.post(
  "/refresh-token",
  authRateLimiter,
  AuthControllers.getNewAccessToken,
);
router.post("/logout", AuthControllers.logOut);
router.post(
  "/change-password",
  authRateLimiter,
  checkAuth(...Object.values(Role)),
  AuthControllers.changePassword,
);
router.post(
  "/forgot-password",
  authRateLimiter,
  AuthControllers.forgotPassword,
);
router.post("/reset-password", authRateLimiter, AuthControllers.resetPassword);

export const AuthRoutes = router;
