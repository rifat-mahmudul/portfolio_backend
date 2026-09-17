import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/login", AuthControllers.login);
router.post("/refresh-token", AuthControllers.getNewAccessToken);
router.post("/logout", AuthControllers.logOut);
router.post(
  "/change-password",
  checkAuth(...Object.values(Role)),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
