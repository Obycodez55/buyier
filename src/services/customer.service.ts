import httpStatus from "http-status";
import { ErrorMessages } from "../constants/error-messages.enum";
import { ICustomer } from "../interfaces/customer.interface";
import { ICustomerRepository } from "../repositories/interfaces/customer.repository.interface";
import HttpException from "../utils/exceptions/http.exception";
import { ILogger } from "../utils/logger/logger.interface";


export class CustomerService {
    constructor(
        private readonly customerRepository: ICustomerRepository,
        private readonly logger: ILogger
    ) {}

    async getCustomerById(id: string) {
        let customer: ICustomer;
        try {
            customer = await this.customerRepository.getCustomerById(id);
        } catch (e) {
            this.logger.error(`${ErrorMessages.GET_USER_BY_ID_FAILED}: ${e}`);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.GET_USER_BY_ID_FAILED);
        }

        if (!customer) {
            this.logger.error(ErrorMessages.USER_NOT_FOUND);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.USER_NOT_FOUND);
        }
        return customer;
    }

    async getCustomerByEmail(email: string) {
        let customer: ICustomer;
        try {
            customer = await this.customerRepository.getCustomerByEmail(email);
        } catch (e) {
            this.logger.error(`${ErrorMessages.GET_USER_BY_EMAIL_FAILED}: ${e}`);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.GET_USER_BY_EMAIL_FAILED);
        }

        if (!customer) {
            this.logger.error(ErrorMessages.USER_NOT_FOUND);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.USER_NOT_FOUND);
        }
        return customer;
    }
}
