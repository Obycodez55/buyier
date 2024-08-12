import httpStatus from "http-status";
import { ErrorMessages } from "../constants/error-messages.enum";
import HttpException from "../utils/exceptions/http.exception";
import { ILogger } from "../utils/logger/logger.interface";
import { ICustomer } from "../../db/models/Customer.model";
import { CustomerRepository } from "../repositories/customer.repository";


export class CustomerService {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly logger: ILogger
    ) {}

    async getCustomerById(id: string) {
        let customer: ICustomer;
        try {
            customer = await this.customerRepository.getCustomerById(id);
        } catch (e) {
            this.logger.error(`${ErrorMessages.GET_CUSTOMER_BY_ID_FAILED}: ${e}`);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.GET_CUSTOMER_BY_ID_FAILED);
        }

        if (!customer) {
            this.logger.error(ErrorMessages.CUSTOMER_NOT_FOUND);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.CUSTOMER_NOT_FOUND);
        }
        return customer;
    }

    async getCustomerByEmail(email: string) {
        let customer: ICustomer;
        try {
            customer = await this.customerRepository.getCustomerByEmail(email);
        } catch (e) {
            this.logger.error(`${ErrorMessages.GET_CUSTOMER_EMAIL_FAILED}: ${e}`);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.GET_CUSTOMER_EMAIL_FAILED);
        }

        if (!customer) {
            this.logger.error(ErrorMessages.CUSTOMER_NOT_FOUND);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.CUSTOMER_NOT_FOUND);
        }
        return customer;
    }
}
