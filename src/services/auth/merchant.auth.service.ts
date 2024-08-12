import { EventEmitter } from "stream";
import { BcryptService } from "../../utils/bcrypt/bcrypt.service";
import { ILogger } from "../../utils/logger/logger.interface";
import { IAuthService } from "./auth.service.interface";
import { IMerchantRepository } from "../../repositories/interfaces/merchant.repository.interface";
import { JWTService } from "../../utils/jwt/jwt.service";
import { VerifyEmailRequestDto } from "../../dtos/authDtos/verifyEmailRequest.dto";
import { EmailVerificationRequestDto } from "../../dtos/authDtos/emailVerificationRequest.dto";
import { ErrorMessages } from "../../constants/error-messages.enum";
import HttpException from "../../utils/exceptions/http.exception";
import httpStatus from "http-status";
import { LoginResponseDto } from "../../dtos/authDtos/loginResponse.dto";
import { MerchantRepository } from "../../repositories/merchant.repository";
import { cryptoService } from "../../utils/crypto";
import { JsonWebTokenError } from "jsonwebtoken";

export class MerchantAuthService implements IAuthService{
    private readonly merchantRepository: MerchantRepository;
    private readonly logger: ILogger;
    private readonly bcryptService: BcryptService;
    private readonly jwtService: JWTService
    private readonly eventEmiter: EventEmitter;

    constructor(
        merchantRepository: MerchantRepository,
        logger: ILogger,
        bcryptService: BcryptService,
        jwtService: JWTService,
        eventEmmiter: EventEmitter
    ) {
        this.merchantRepository = merchantRepository;
        this.logger = logger;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService
        this.eventEmiter = eventEmmiter;
    }

    async login(loginData: any): Promise<any> {
        const {email, password} = loginData;

        const merchant = await this.merchantRepository.getMerchantByEmail(email);
        if(!merchant){
            this.logger.error(ErrorMessages.INVALID_EMAIL_PASSWORD);
            throw new HttpException(httpStatus.UNAUTHORIZED, ErrorMessages.INVALID_EMAIL_PASSWORD);
        }

        const isPasswordMatch = await this.bcryptService.comparePassword(password, merchant.password);
        if(!isPasswordMatch){
            this.logger.error(ErrorMessages.INVALID_EMAIL_PASSWORD);
            throw new HttpException(httpStatus.UNAUTHORIZED, ErrorMessages.INVALID_EMAIL_PASSWORD);
        }

        const payload = {email: merchant.email, id: merchant.id};
        const token = this.jwtService.signPayload(payload);
        const response = new LoginResponseDto();
        response.token = token;
        return response;
    }

    async register(registerData: any): Promise<boolean> {
        const {email, password} = registerData;

        // Check if email is already registered
        const merchant = await this.merchantRepository.getMerchantByEmail(email);
        if(merchant){
            this.logger.error(ErrorMessages.EMAIL_EXISTS);
            throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.EMAIL_EXISTS);
        }
        // Check if brand name is already registered
        const merchantBrand = await this.merchantRepository.getMerchantByBrandName(registerData.brandName);
        if(merchantBrand){
            this.logger.error(ErrorMessages.BRAND_NAME_EXISTS);
            throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.BRAND_NAME_EXISTS);
        }
        try {
            const hashedPassword = await this.bcryptService.hashPassword(password);
            const newMerchant = {...registerData, password: hashedPassword};
            await this.merchantRepository.save(newMerchant);
            return true;
        } catch (e) {
            this.logger.error(`${ErrorMessages.REGISTER_MERCHANT_FAILED}: ${e}`);
            throw new HttpException(httpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.REGISTER_MERCHANT_FAILED);
        }
    }

    async emailVerification(emailVerificationData: EmailVerificationRequestDto): Promise<boolean> {
        const { email } = emailVerificationData;
        const merchant = await this.merchantRepository.getMerchantByEmail(email);
        if (!merchant) {
            this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.MERCHANT_NOT_FOUND);
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        await this.merchantRepository.update({emailVerificationCode: verificationCode}, merchant.id);
        this.eventEmiter.emit("sendEmailVerificationEmail", { email, verificationCode });
        return true;
    }

    async verifyEmail(verifyEmailData: VerifyEmailRequestDto): Promise<boolean> {
        try {
            const { token } = verifyEmailData;
            const decrypted = cryptoService.decrypt(token);
            const { email, verificationCode } = this.jwtService.verifyToken(decrypted);
            const merchant = await this.merchantRepository.getMerchantById(email);
            if (!merchant) {
                this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
                throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.MERCHANT_NOT_FOUND);
            }
            if (merchant.emailVerificationCode !== verificationCode) {
                this.logger.error(ErrorMessages.INVALID_VERIFICATION_TOKEN);
                throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.INVALID_VERIFICATION_TOKEN);
            }
            await this.merchantRepository.update({ emailVerifiedAt: new Date() }, merchant.id);
            return true;
        } catch (e) {
            if (e instanceof JsonWebTokenError) {
                this.logger.error(ErrorMessages.INVALID_VERIFICATION_TOKEN);
                throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.INVALID_VERIFICATION_TOKEN);
            }else{
                this.logger.error(`${ErrorMessages.EMAIL_VERIFICATION_FAILED}: ${e}`);
                throw new HttpException(httpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.EMAIL_VERIFICATION_FAILED);
            }
        }
    }

    async forgotPassword(forgotPasswordData: any): Promise<boolean> {
        const { email } = forgotPasswordData;
        const merchant = await this.merchantRepository.getMerchantByEmail(email);
        if (!merchant) {
            this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.MERCHANT_NOT_FOUND);
        }
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        await this.merchantRepository.update({passwordResetCode: resetCode}, merchant.id);
        this.eventEmiter.emit("sendPasswordResetEmail", { email, resetCode });
        return true;
    }

    async resetPassword(resetPasswordData: any): Promise<boolean> {
        try {
            const { token, newPassword } = resetPasswordData;
            const decrypted = cryptoService.decrypt(token);
            const { email, resetCode } = this.jwtService.verifyToken(decrypted);
            const merchant = await this.merchantRepository.getMerchantByEmail(email);
            if (!merchant) {
                this.logger.error(ErrorMessages.MERCHANT_NOT_FOUND);
                throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.MERCHANT_NOT_FOUND);
            }
            if (merchant.passwordResetCode !== resetCode) {
                this.logger.error(ErrorMessages.INVALID_RESET_TOKEN);
                throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.INVALID_RESET_TOKEN);
            }
            await this.merchantRepository.update({ password: newPassword }, merchant.id);
            return true;
        } catch (e) {
            if (e instanceof JsonWebTokenError) {
                this.logger.error(ErrorMessages.INVALID_VERIFICATION_TOKEN);
                throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.INVALID_VERIFICATION_TOKEN);
            }else{
                this.logger.error(`${ErrorMessages.EMAIL_VERIFICATION_FAILED}: ${e}`);
                throw new HttpException(httpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.EMAIL_VERIFICATION_FAILED);
            }
        }
    }
}