import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import {
  createProjectZodSchema,
  updateProjectZodSchema,
} from "./project.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { ProjectControllers } from "./project.controller";
import { multerUpload } from "../../config/multer.config";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN),
  multerUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  validateRequest(createProjectZodSchema),
  ProjectControllers.createProject,
);
router.get("/", ProjectControllers.getAllProjects);
router.get("/:slug", ProjectControllers.getSingleProject);
router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
   multerUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  validateRequest(updateProjectZodSchema),
  ProjectControllers.updatedProject,
);
router.delete("/:id", checkAuth(Role.ADMIN), ProjectControllers.deleteProject);

export const ProjectRoutes = router;
