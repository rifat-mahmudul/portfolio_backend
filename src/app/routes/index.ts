import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProfileRoutes } from "../modules/profile/profile.route";
import { ProjectRoutes } from "../modules/project/project.routes";
import { ExperienceRoutes } from "../modules/experience/experience.route";
import { SkillRoutes } from "../modules/skill/skill.route";
import { EducationRoutes } from "../modules/education/education.route";
import { ServiceRoutes } from "../modules/service/service.route";
import { ContactRoutes } from "../modules/contact/contact.route";
import { BlogCategoryRoutes } from "../modules/blogCategory/blogCategory.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { DashboardRoutes } from "../modules/dashboard/dashboard.route";

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
  {
    path: "/education",
    route: EducationRoutes,
  },
  {
    path: "/service",
    route: ServiceRoutes,
  },
  {
    path: "/contact",
    route: ContactRoutes,
  },
  {
    path: "/blog-category",
    route: BlogCategoryRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
