import { Router } from "express";

import CustomerAuthRouter from "./customer.auth.routes";
import MerchantAuthRouter from "./merchant.auth.routes";

const router = Router();

router.get("/",(req,res)=>{
    res.send("Auth Service is up and running");

});

router.use("/customer",CustomerAuthRouter);

router.use("/merchant",MerchantAuthRouter);

export default router;