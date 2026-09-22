import { Router } from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";

import { Role } from "../user/user.interface";

import { SkillControllers } from "./skill.controller";
import { createSkillZodSchema, updateSkillZodSchema } from "./skill.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN),
  validateRequest(createSkillZodSchema),
  SkillControllers.createSkill,
);

router.get("/", SkillControllers.getAllSkills);

router.get("/:id", SkillControllers.getSingleSkill);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateSkillZodSchema),
  SkillControllers.updateSkill,
);

router.delete("/:id", checkAuth(Role.ADMIN), SkillControllers.deleteSkill);

export const SkillRoutes = router;
