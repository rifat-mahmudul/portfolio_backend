import { Router } from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";

import { Role } from "../user/user.interface";

import { ServiceControllers } from "./service.controller";
import {
  createServiceZodSchema,
  updateServiceZodSchema,
} from "./service.validation";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN),
  validateRequest(createServiceZodSchema),
  ServiceControllers.createService,
);

router.get("/", ServiceControllers.getAllServices);

router.get("/:id", ServiceControllers.getSingleService);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateServiceZodSchema),
  ServiceControllers.updateService,
);

router.delete("/:id", checkAuth(Role.ADMIN), ServiceControllers.deleteService);

export const ServiceRoutes = router;
