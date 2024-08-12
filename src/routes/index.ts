import { Router } from "express";
import { HomeController } from "../controllers/home.controller";

import AuthRouter from "./auth";

const router = Router();
const homeController = new HomeController();

router.get("/", homeController.index);

router.use("/auth", AuthRouter);



export default router;