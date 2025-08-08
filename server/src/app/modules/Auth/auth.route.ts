import express from "express";
import validateRequest from "../../middlewares/validateRequst";
import { AuthValidation } from "./auth.validation";
import AuthController from "./auth.controller";

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

export const AuthRoutes = router;
