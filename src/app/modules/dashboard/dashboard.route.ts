import { Router } from "express";
import { Role } from "../user/user.interface";
import { DashboardControllers } from "./dashboard.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.get(
  "/statistics",
  checkAuth(Role.ADMIN),
  DashboardControllers.getDashboardStatistics,
);

router.get(
  "/blog-analytics",
  checkAuth(Role.ADMIN),
  DashboardControllers.getBlogAnalytics,
);

router.get(
  "/most-viewed-blogs",
  checkAuth(Role.ADMIN),
  DashboardControllers.getMostViewedBlogs,
);

export const DashboardRoutes = router;