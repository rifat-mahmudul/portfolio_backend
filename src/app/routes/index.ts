import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProfileRoutes } from "../modules/profile/profile.route";
import { ProjectRoutes } from "../modules/project/project.routes";
import { ExperienceRoutes } from "../modules/experience/experience.route";
import { SkillRoutes } from "../modules/skill/skill.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/profile",
    route: ProfileRoutes,
  },
  {
    path: "/project",
    route: ProjectRoutes,
  },
  {
    path: "/experience",
    route: ExperienceRoutes,
  },
  {
    path: "/skill",
    route: SkillRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
