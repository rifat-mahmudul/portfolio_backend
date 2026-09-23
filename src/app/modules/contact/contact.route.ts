import { Router } from "express";

import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";

import { Role } from "../user/user.interface";

import { ContactControllers } from "./contact.controller";
import {
  createContactZodSchema,
  updateContactZodSchema,
} from "./contact.validation";

const router = Router();

router.post(
  "/",
  validateRequest(createContactZodSchema),
  ContactControllers.createContact,
);

router.get("/", checkAuth(Role.ADMIN), ContactControllers.getAllContacts);

router.get("/:id", checkAuth(Role.ADMIN), ContactControllers.getSingleContact);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateContactZodSchema),
  ContactControllers.updateContact,
);

router.delete("/:id", checkAuth(Role.ADMIN), ContactControllers.deleteContact);

export const ContactRoutes = router;
