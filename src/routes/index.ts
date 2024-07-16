import { Request, Response, Router } from "express";
import HttpException from "../utils/exceptions/http.exception";
import { ResponseDto } from "../dtos/response.dto";
import { SuccessMessages } from "../constants/success-messages.enum";
import HttpStatus from "http-status";
import { ResponseStatus } from "../interfaces/response.interface";


const router = Router();

router.get("/", (req: Request, res: Response) => {
    const resObj = new ResponseDto(ResponseStatus.SUCCESS ,SuccessMessages.WELCOME_HOME);
    res.status(HttpStatus.OK).send(resObj);
});

// Handle All 404 Routes
router.all("*", (req: Request, res: Response) => {
    throw new HttpException(404, "Route not found");
});

export default router;