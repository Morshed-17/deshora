import express from "express";
import validateRequest from "../../middlewares/validateRequst";
import { AuthValidation } from "./auth.validation";
import AuthController from "./auth.controller";
import auth from "../../middlewares/auth";
import UserController from "../User/user.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerValidationSchema),
  AuthController.registerUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

router.get("/me", auth("admin", "user"), UserController.getMe);

export const AuthRoutes = router;
