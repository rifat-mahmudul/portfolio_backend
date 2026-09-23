import { Router } from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";

import { BlogControllers } from "./blog.controller";

import { createBlogZodSchema, updateBlogZodSchema } from "./blog.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN),
  validateRequest(createBlogZodSchema),
  BlogControllers.createBlog,
);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateBlogZodSchema),
  BlogControllers.updateBlog,
);

router.delete("/:id", checkAuth(Role.ADMIN), BlogControllers.deleteBlog);

router.get("/", BlogControllers.getAllBlogs);

router.get("/:slug", BlogControllers.getSingleBlog);

export const BlogRoutes = router;
