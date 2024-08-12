import httpStatus from "http-status";
import { ErrorMessages } from "../constants/error-messages.enum";
import HttpException from "../utils/exceptions/http.exception";
import { ILogger } from "../utils/logger/logger.interface";
import { IMerchant } from "../../db/models/Merchant.model";
import { MerchantRepository } from "../repositories/merchant.repository";

export class MerchantService {
    constructor(
        private readonly merchantRepository: MerchantRepository,
        private readonly logger: ILogger
    ) {}

    async getCustomerById(id: string) {
        let customer: IMerchant;
        try {
            customer = await this.merchantRepository.getMerchantById(id);
        } catch (e) {
            this.logger.error(`${ErrorMessages.GET_MERCHANT_BY_ID_FAILED}: ${e}`);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.GET_MERCHANT_BY_ID_FAILED);
        }

        if (!customer) {
            this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.MERCHANT_NOT_FOUND);
        }
        return customer;
    }

    async getCustomerByEmail(email: string) {
        let customer: IMerchant;
        try {
            customer = await this.merchantRepository.getMerchantByEmail(email);
        } catch (e) {
            this.logger.error(`${ErrorMessages.GET_MERCHANT_EMAIL_FAILED}: ${e}`);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.GET_MERCHANT_EMAIL_FAILED);
        }

        if (!customer) {
            this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.MERCHANT_NOT_FOUND);
        }
        return customer;
    }
}
