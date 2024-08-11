import httpStatus from "http-status";
import { ErrorMessages } from "../../constants/error-messages.enum";
import { CustomerService } from "../../services/customer.service";
import HttpException from "../exceptions/http.exception";
import { JWTService } from "../jwt/jwt.service";
import { ILogger } from "../logger/logger.interface";
import { NextFunction, Request, RequestHandler, Response } from "express";


export class AuthorisationMiddleware {
    constructor(
        private readonly customerService: CustomerService,
        private readonly jwtService: JWTService,
        private readonly logger: ILogger
    ) { };

    authenticate: RequestHandler = async (request: Request, respone: Response, next: NextFunction) => {
        try {
            const customer = await this.validateRequest(request as { headers: { authorization: any } });
            request.body.customer = customer;
            next();
        } catch (error) {
            next(error);
    }
    }

    private async validateRequest(request: { headers: { authorization: any } }) {
        if (!request.headers.authorization) {
            this.logger.error(ErrorMessages.NO_AUTH_ERROR);
            throw new HttpException(httpStatus.UNAUTHORIZED, ErrorMessages.NO_AUTH_ERROR);
        }
        const auth = request.headers.authorization;
        if (auth.split(' ')[0] !== 'Bearer') {
            this.logger.error(ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED);
            throw new HttpException(httpStatus.UNAUTHORIZED, ErrorMessages.INVALID_AUTH_TOKEN_SUPPLIED);
        }
        const token = auth.split(' ')[1];
        try {
            const { id } = this.jwtService.verifyToken(token);
            const customer = await this.customerService.getCustomerById(id);
            return customer;
        } catch (error) {
            this.logger.error(`${ErrorMessages.USER_UNAUTHORIZED}: ${error}`);
            throw new HttpException(httpStatus.UNAUTHORIZED, ErrorMessages.USER_UNAUTHORIZED);
        }
    }
}
