import { Router } from "express";

import CustomerAuthRouter from "./customer.auth.routes";
import MerchantAuthRouter from "./merchant.auth.routes";

const router = Router();

router.get("/customer",CustomerAuthRouter);

router.get("/merchant",MerchantAuthRouter);

export default router;