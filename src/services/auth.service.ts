import { ICustomerRepository } from "../repositories/interfaces/customer.repository.interface";
import { BcryptService } from "../utils/bcrypt/bcrypt.service";
import { EmailService } from "../utils/email/email.service";
import { eventEmmiter } from "../utils/events";
import { JWTService } from "../utils/jwt/jwt.service";
import { ILogger } from "../utils/logger/logger.interface";
import EventEmitter from "events";

export class AuthService {
    private readonly customerRepository: ICustomerRepository;
    private readonly logger: ILogger;
    private readonly bcryptService: BcryptService;
    private readonly jwtService: JWTService;
    private readonly emailService: EmailService;
    private readonly eventEmiter: EventEmitter;

    constructor(
        customerRepository: ICustomerRepository,
        logger: ILogger,
        bcryptService: BcryptService,
        jwtService: JWTService
    ) {
        this.customerRepository = customerRepository;
        this.logger = logger;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
        this.emailService = new EmailService();
        this.eventEmiter = eventEmmiter;
    }

    initializeEventHandlers() {
        this.eventEmiter.on("sendPasswordResetEmail", async (data: {email: string, resetCode: string}) => {
            const {email, resetCode} = data;
            const payload = {email, resetCode}
            const hash = this.jwtService.signPayload(payload);
        });
    }
}