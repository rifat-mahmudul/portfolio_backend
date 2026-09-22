import { Router } from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";

import { Role } from "../user/user.interface";

import { EducationControllers } from "./education.controller";
import { createEducationZodSchema, updateEducationZodSchema } from "./education.validation";


const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN),
  validateRequest(createEducationZodSchema),
  EducationControllers.createEducation,
);

router.get("/", EducationControllers.getAllEducations);

router.get("/:id", EducationControllers.getSingleEducation);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateEducationZodSchema),
  EducationControllers.updateEducation,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN),
  EducationControllers.deleteEducation,
);

export const EducationRoutes = router;
