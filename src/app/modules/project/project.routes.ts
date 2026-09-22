import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import {
  createProjectZodSchema,
  updateProjectZodSchema,
} from "./project.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { ProjectControllers } from "./project.controller";

const router = Router();

router.post(
  "/create",
  checkAuth("ADMIN"),
  validateRequest(createProjectZodSchema),
  ProjectControllers.createProject,
);
router.get("/", ProjectControllers.getAllProjects);
router.get("/:slug", ProjectControllers.getSingleProject);
router.patch(
  "/:id",
  checkAuth("ADMIN"),
  validateRequest(updateProjectZodSchema),
  ProjectControllers.updatedProject,
);

export const ProjectRoutes = router;
