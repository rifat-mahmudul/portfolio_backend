import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ProfileControllers } from "./profile.controller";
import { createProfileZodSchema } from "./profile.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create",
  checkAuth("ADMIN"),
  validateRequest(createProfileZodSchema),
  ProfileControllers.createProfile,
);

export const ProfileRoutes = router;
