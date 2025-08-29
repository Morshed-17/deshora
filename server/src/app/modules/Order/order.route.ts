import { Router } from "express";

import auth from "../../middlewares/auth";
import { OrderController } from "./order.controller";
import validateRequest from "../../middlewares/validateRequst";
import { createOrderSchema } from "./order.validation";

const router = Router();

router.post(
  "/",
  validateRequest(createOrderSchema),
  OrderController.createOrder
);

export const OrderRoutes = router;
