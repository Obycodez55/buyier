  import { NextFunction, Request, Response } from "express";
  import HttpException from "../exceptions/http.exception";
  import HttpStatus from "http-status";
  import { ResponseStatus } from "../../dtos/interfaces/response.interface";
  import { ResponseDto } from "../../dtos/response.dto";


  function errorHandler(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || "Something went wrong";

    const resObj = new ResponseDto(ResponseStatus.ERROR, message);
    response.status(status).send(resObj);
    return next();
  }

  export default errorHandler;