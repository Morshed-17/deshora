import express from "express";
import TestController from "./user.controller";
const router = express.Router();

router.get("/test", TestController.getTests);


export const TestRoutes = router;