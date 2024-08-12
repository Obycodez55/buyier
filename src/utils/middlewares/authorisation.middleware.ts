import httpStatus from "http-status";
import { ErrorMessages } from "../../constants/error-messages.enum";
import { CustomerService } from "../../services/customer.service";
import HttpException from "../exceptions/http.exception";
import { JWTService } from "../jwt/jwt.service";
import { ILogger } from "../logger/logger.interface";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { MerchantService } from "../../services/merchant.service";


export class AuthorisationMiddleware {
    constructor(
        private readonly jwtService: JWTService,
        private readonly logger: ILogger,
        private readonly customerService?: CustomerService,
        private readonly merchantService?: MerchantService
    ) {

     };

    authenticate: RequestHandler = async (request: Request, respone: Response, next: NextFunction) => {
        try {
            const user = await this.validateRequest(request as { headers: { authorization: any } });
            request.body.user = user;
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
            const user = await this.customerService?.getCustomerById(id) || await this.merchantService?.getCustomerById(id);
            return user;
        } catch (error) {
            this.logger.error(`${ErrorMessages.USER_UNAUTHORIZED}: ${error}`);
            throw new HttpException(httpStatus.UNAUTHORIZED, ErrorMessages.USER_UNAUTHORIZED);
        }
    }
}
