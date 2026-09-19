import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ProfileControllers } from "./profile.controller";
import {
  createProfileZodSchema,
  updateProfileZodSchema,
} from "./profile.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create",
  checkAuth("ADMIN"),
  validateRequest(createProfileZodSchema),
  ProfileControllers.createProfile,
);

router.patch(
  "/",
  checkAuth("ADMIN"),
  validateRequest(updateProfileZodSchema),
  ProfileControllers.updateProfile,
);

export const ProfileRoutes = router;
