import { BcryptService } from "../../utils/bcrypt/bcrypt.service";
import { cryptoService } from "../../utils/crypto";
import { EmailService } from "../../utils/email/email.service";
import { eventEmmiter } from "../../utils/events";
import { JWTService } from "../../utils/jwt/jwt.service";
import { ILogger } from "../../utils/logger/logger.interface";
import EventEmitter from "events";
import { EmailPaths } from "../../constants/email-paths.enum";
import { LoginRequestDto } from "../../dtos/authDtos/loginRequest.dto";
import { LoginResponseDto } from "../../dtos/authDtos/loginResponse.dto";
import { IAuthService } from "./auth.service.interface";
import { CustomerRepository } from "../../repositories/customer.repository";
import { MerchantRepository } from "../../repositories/merchant.repository";
import { CustomerAuthService } from "./customer.auth.service";
import { MerchantAuthService } from "./merchant.auth.service";


// Define types for CustomerContext and MerchantContext
type CustomerContext = {
    userRepository: CustomerRepository;
    context: "Customer";
};

type MerchantContext = {
    userRepository: MerchantRepository;
    context: "Merchant";
};

type AuthServiceContext = CustomerContext | MerchantContext;

export class AuthService implements IAuthService {
    private readonly logger: ILogger;
    private readonly bcryptService: BcryptService;
    private readonly jwtService: JWTService;
    private readonly emailService: EmailService;
    private readonly eventEmiter: EventEmitter;
    private context: CustomerAuthService | MerchantAuthService;

    public login!: (loginData: LoginRequestDto) => Promise<LoginResponseDto>;
    public register!: (registerData: any) => Promise<boolean>;
    public forgotPassword!: (forgotPasswordData: any) => Promise<boolean>;
    public resetPassword!: (resetPasswordData: any) => Promise<boolean>;
    public emailVerification!: (emailVerificationData: any) => Promise<boolean>;
    public verifyEmail!: (verifyEmailData: any) => Promise<boolean>;

    constructor(
        logger: ILogger,
        bcryptService: BcryptService,
        jwtService: JWTService,
        context: AuthServiceContext
    ) {
        this.logger = logger;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
        this.emailService = new EmailService();
        this.eventEmiter = eventEmmiter;
        this.initializeEventHandlers();

        if (this.isCustomerContext(context)) {
            this.context = new CustomerAuthService(
                context.userRepository,
                this.logger,
                this.bcryptService,
                this.jwtService,
                this.eventEmiter
            );
        } else if (this.isMerchantContext(context)) {
            this.context = new MerchantAuthService(
                context.userRepository,
                this.logger,
                this.bcryptService,
                this.jwtService,
                this.eventEmiter
            );
        } else {
            throw new Error("Invalid context provided");
        }

        // Set the method references after context is initialized
        this.login = this.context.login.bind(this.context);
        this.register = this.context.register.bind(this.context);
        this.forgotPassword = this.context.forgotPassword.bind(this.context);
        this.resetPassword = this.context.resetPassword.bind(this.context);
        this.emailVerification = this.context.emailVerification.bind(this.context);
        this.verifyEmail = this.context.verifyEmail.bind(this.context);
    }

    // Type guard for CustomerContext
    private isCustomerContext(context: AuthServiceContext): context is CustomerContext {
        return context.context === "Customer";
    }

    // Type guard for MerchantContext
    private isMerchantContext(context: AuthServiceContext): context is MerchantContext {
        return context.context === "Merchant";
    }

    private getToken(payload: { [key: string]: any }) {
        const hash = this.jwtService.signPayload(payload, "15m");
        const token = cryptoService.encrypt(hash);
        const encrypted = cryptoService.encrypt(token);
        return encrypted;
    }

    initializeEventHandlers() {
        this.eventEmiter.on("sendPasswordResetEmail", async (data: { email: string, resetCode: string }) => {
            const { email, resetCode } = data;
            const payload = { email, resetCode };
            const token = this.getToken(payload);
            const link = token;
            await this.emailService.sendMail({
                to: email,
                subject: "Forgot Password",
                options: {
                    template: EmailPaths.PASSWORD_RESET,
                    data: { link }
                }
            })
        });

        this.eventEmiter.on("sendEmailVerificationEmail", async (data: { email: string, verificationCode: string }) => {
            const { email, verificationCode } = data;
            const payload = { email, verificationCode };
            const token = this.getToken(payload);
            const link = token;
            await this.emailService.sendMail({
                to: email,
                subject: "Email Verification",
                options: {
                    template: EmailPaths.EMAIL_VERIFICATION,
                    data: { link }
                }
            })
        });

        this.eventEmiter.on("sendWelcomeEmail", async (data: { email: string, firstName: string, lastName: string }) => {
            const { email, firstName, lastName } = data;
            await this.emailService.sendMail({
                to: email,
                subject: "Welcome to Buyier",
                options: {
                    template: EmailPaths.WELCOME,
                    data: { firstName, lastName }
                }
            })
        });

    }
}
