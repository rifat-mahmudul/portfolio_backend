import { Router } from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";

import { BlogCategoryControllers } from "./blogCategory.controller";

import {
  createBlogCategoryZodSchema,
  updateBlogCategoryZodSchema,
} from "./blogCategory.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN),
  validateRequest(createBlogCategoryZodSchema),
  BlogCategoryControllers.createBlogCategory,
);

router.get("/", BlogCategoryControllers.getAllBlogCategories);

router.get("/:id", BlogCategoryControllers.getSingleBlogCategory);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateBlogCategoryZodSchema),
  BlogCategoryControllers.updateBlogCategory,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN),
  BlogCategoryControllers.deleteBlogCategory,
);

export const BlogCategoryRoutes = router;
