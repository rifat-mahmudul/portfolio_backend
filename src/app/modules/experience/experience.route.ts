import { Router } from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";

import { ExperienceControllers } from "./experience.controller";
import {
  createExperienceZodSchema,
  updateExperienceZodSchema,
} from "./experience.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN),
  validateRequest(createExperienceZodSchema),
  ExperienceControllers.createExperience,
);

router.get("/", ExperienceControllers.getAllExperiences);

router.get("/:id", ExperienceControllers.getSingleExperience);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateExperienceZodSchema),
  ExperienceControllers.updateExperience,
);

export const ExperienceRoutes = router;
