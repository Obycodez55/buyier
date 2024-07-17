import { Request, Response, Router } from "express";
import HttpException from "../utils/exceptions/http.exception";
import { HomeController } from "../controllers/home.controller";


const router = Router();
const homeController = new HomeController();

router.get("/", homeController.index);

// Handle All 404 Routes
router.all("*", (req: Request, res: Response) => {
    throw new HttpException(404, "Route not found");
});

export default router;