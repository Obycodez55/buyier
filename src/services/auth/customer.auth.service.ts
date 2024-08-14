import EventEmitter  from "events";
import { BcryptService } from "../../utils/bcrypt/bcrypt.service";
import { ILogger } from "../../utils/logger/logger.interface";
import { IAuthService } from "./auth.service.interface";
import { CustomerRepository } from "../../repositories/customer.repository";
import { LoginRequestDto } from "../../dtos/authDtos/loginRequest.dto";
import { LoginResponseDto } from "../../dtos/authDtos/loginResponse.dto";
import { JWTService } from "../../utils/jwt/jwt.service";
import { ErrorMessages } from "../../constants/error-messages.enum";
import HttpException from "../../utils/exceptions/http.exception";
import httpStatus from "http-status";
import { CustomerRegisterRequestDto } from "../../dtos/authDtos/customerRegisterRequest.dto";
import { EmailVerificationRequestDto } from "../../dtos/authDtos/emailVerificationRequest.dto";
import { VerifyEmailRequestDto } from "../../dtos/authDtos/verifyEmailRequest.dto";
import { cryptoService } from "../../utils/crypto";
import { JsonWebTokenError } from "jsonwebtoken";
import { ForgotPasswordRequestDto } from "../../dtos/authDtos/forgotPasswordRequest.dto";
import { ResetPasswordRequestDto } from "../../dtos/authDtos/resetPasswordRequest.dto";
import { eventEmmiter } from "../../utils/events";

export class CustomerAuthService implements IAuthService {
    private readonly customerRepository: CustomerRepository;
    private readonly logger: ILogger;
    private readonly bcryptService: BcryptService;
    private readonly jwtService: JWTService;
    private readonly eventEmiter: EventEmitter;

    constructor(
        customerRepository: CustomerRepository,
        logger: ILogger,
        bcryptService: BcryptService,
        jwtService: JWTService
    ) {
        this.customerRepository = customerRepository;
        this.logger = logger;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService
        this.eventEmiter = eventEmmiter;
    }

    private getToken(payload: { [key: string]: any }) {
        const hash = this.jwtService.signPayload(payload, "15m");
        const token = cryptoService.encrypt(hash);
        return token;
    }

    async login(loginData: LoginRequestDto): Promise<LoginResponseDto> {
        const { email, password } = loginData;

        const customer = await this.customerRepository.getCustomerByEmail(email);
        if (!customer) {
            this.logger.error(ErrorMessages.INVALID_EMAIL_PASSWORD);
            throw new HttpException(httpStatus.UNAUTHORIZED, ErrorMessages.INVALID_EMAIL_PASSWORD);
        }

        const isPasswordMatch = await this.bcryptService.comparePassword(password, customer.password);
        if (!isPasswordMatch) {
            this.logger.error(ErrorMessages.INVALID_EMAIL_PASSWORD);
            throw new HttpException(httpStatus.UNAUTHORIZED, ErrorMessages.INVALID_EMAIL_PASSWORD);
        }

        const payload = { email: customer.email, id: customer.id };
        const token = this.jwtService.signPayload(payload);
        const response = new LoginResponseDto();
        response.token = token;
        return response;
    }

    async register(registerData: CustomerRegisterRequestDto): Promise<boolean> {
        const { email, firstName, lastName, password } = registerData;

        // Check if email is already registered
        const customer = await this.customerRepository.getCustomerByEmail(email);
        if (customer) {
            this.logger.error(ErrorMessages.EMAIL_EXISTS);
            throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.EMAIL_EXISTS);
        }
        try {
            const hashedPassword = await this.bcryptService.hashPassword(password);
            const newCustomerData = { ...registerData, password: hashedPassword };
            const newCustomer = await this.customerRepository.save(newCustomerData);

            // Send welcome email
            this.eventEmiter.emit("sendCustomerWelcomeEmail", { email, firstName, lastName });

            // Send email verification code
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            await this.customerRepository.update({ emailVerificationCode: verificationCode }, newCustomer.id);
            const token = this.getToken({ email, verificationCode });
            this.eventEmiter.emit("sendCustomerEmailVerificationEmail", { email, token });
            return true;
        } catch (e) {
            this.logger.error(`${ErrorMessages.REGISTER_CUSTOMER_FAILED}: ${e}`);
            throw new HttpException(httpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.REGISTER_CUSTOMER_FAILED);
        }
    }

    async emailVerification(emailVerificationData: EmailVerificationRequestDto): Promise<boolean> {
        const { email } = emailVerificationData;
        const customer = await this.customerRepository.getCustomerByEmail(email);
        if (!customer) {
            this.logger.error(ErrorMessages.CUSTOMER_NOT_FOUND);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.CUSTOMER_NOT_FOUND);
        }
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        await this.customerRepository.update({ emailVerificationCode: verificationCode }, customer.id);
        const token = this.getToken({ email, verificationCode });
        this.eventEmiter.emit("sendCustomerEmailVerificationEmail", { email, token });
        return true;
    }

    async verifyEmail(verifyEmailData: VerifyEmailRequestDto): Promise<boolean> {
        try {
            const { token } = verifyEmailData;
            const decrypted = cryptoService.decrypt(token);
            const { email, verificationCode } = this.jwtService.verifyToken(decrypted);
            const customer = await this.customerRepository.getCustomerByEmail(email);
            if (!customer) {
                this.logger.error(ErrorMessages.CUSTOMER_NOT_FOUND);
                throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.CUSTOMER_NOT_FOUND);
            }
            if (customer.emailVerificationCode !== verificationCode) {
                this.logger.error(ErrorMessages.INVALID_VERIFICATION_TOKEN);
                throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.INVALID_VERIFICATION_TOKEN);
            }
            await this.customerRepository.update({ emailVerifiedAt: new Date(), emailVerificationCode: null }, customer.id);
            return true;
        } catch (e) {
            if (e instanceof JsonWebTokenError) {
                this.logger.error(ErrorMessages.INVALID_VERIFICATION_TOKEN);
                throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.INVALID_VERIFICATION_TOKEN);
            } else {
                this.logger.error(`${ErrorMessages.EMAIL_VERIFICATION_FAILED}: ${e}`);
                throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.INVALID_VERIFICATION_TOKEN);
                // throw new HttpException(httpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.EMAIL_VERIFICATION_FAILED);
            }
        }

    }

    async forgotPassword(forgotPasswordData: ForgotPasswordRequestDto): Promise<boolean> {
        const { email } = forgotPasswordData;
        const customer = await this.customerRepository.getCustomerByEmail(email);
        if (!customer) {
            this.logger.error(ErrorMessages.CUSTOMER_NOT_FOUND);
            throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.CUSTOMER_NOT_FOUND);
        }
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        await this.customerRepository.update({ passwordResetCode: resetCode }, customer.id);
        const token = this.getToken({ email, resetCode });
        this.eventEmiter.emit("sendCustomerPasswordResetEmail", { email, token });
        return true;
    }

    async resetPassword(resetPasswordData: ResetPasswordRequestDto): Promise<boolean> {
        try {
            const { token, newPassword } = resetPasswordData;
            const decrypted = cryptoService.decrypt(token);
            const { email, resetCode } = this.jwtService.verifyToken(decrypted);
            const customer = await this.customerRepository.getCustomerByEmail(email);
            if (!customer) {
                this.logger.error(ErrorMessages.CUSTOMER_NOT_FOUND);
                throw new HttpException(httpStatus.NOT_FOUND, ErrorMessages.CUSTOMER_NOT_FOUND);
            }
            if (customer.passwordResetCode !== resetCode) {
                this.logger.error(ErrorMessages.INVALID_RESET_TOKEN);
                throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.INVALID_RESET_TOKEN);
            }
            const hashedPassword = await this.bcryptService.hashPassword(newPassword);
            await this.customerRepository.update({ password: hashedPassword, passwordResetCode: null }, customer.id);
            return true;
        } catch (e) {
            if (e instanceof JsonWebTokenError) {
                this.logger.error(ErrorMessages.INVALID_VERIFICATION_TOKEN);
                throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.INVALID_VERIFICATION_TOKEN);
            } else {
                this.logger.error(`${ErrorMessages.EMAIL_VERIFICATION_FAILED}: ${e}`);
                throw new HttpException(httpStatus.BAD_REQUEST, ErrorMessages.INVALID_VERIFICATION_TOKEN);
                // throw new HttpException(httpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.EMAIL_VERIFICATION_FAILED);
            }
        }
    }
}