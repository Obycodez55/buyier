import { Request, RequestHandler, Response } from "express";
import { ResponseDto } from "../dtos/response.dto";
import HttpStatus from "http-status";
import { SuccessMessages } from "../constants/success-messages.enum";
import { ResponseStatus } from "../dtos/interfaces/response.interface";

export class HomeController {
    index: RequestHandler = (request: Request, response: Response) => {
        const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.WELCOME_HOME);
        response.status(HttpStatus.OK).send(resObj);
    };
}