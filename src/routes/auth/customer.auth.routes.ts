import { Router } from "express";
import { CustomerRepository } from "../../repositories/customer.repository";
import { WinstonLogger } from "../../utils/logger/winston.logger";
import { BcryptService } from "../../utils/bcrypt/bcrypt.service";
import { JWTService } from "../../utils/jwt/jwt.service";
import { AuthService } from "../../services/auth/auth.service";
import { AuthController } from "../../controllers/auth.controller";
import { validateBody } from "../../utils/middlewares/validator.middleware";
import { LoginRequestDto } from "../../dtos/authDtos/loginRequest.dto";
import { CustomerRegisterRequestDto } from "../../dtos/authDtos/customerRegisterRequest.dto";
import { EmailVerificationRequestDto } from "../../dtos/authDtos/emailVerificationRequest.dto";
import { VerifyEmailRequestDto } from "../../dtos/authDtos/verifyEmailRequest.dto";
import { ForgotPasswordRequestDto } from "../../dtos/authDtos/forgotPasswordRequest.dto";
import { ResetPasswordRequestDto } from "../../dtos/authDtos/resetPasswordRequest.dto";


// Customer Auth Service Independents Routes
const customerRepository = new CustomerRepository();
const logger = new WinstonLogger("CustomerAuthService");
const bcryptService = new BcryptService();
const jwtService = new JWTService();

const customerAuthService = new AuthService(logger, bcryptService, jwtService,{
    context: "Customer",
    userRepository: customerRepository
});
const authController = new AuthController(customerAuthService);

const  router = Router();

router.post("/login", validateBody(LoginRequestDto) ,authController.login);

router.post("/register", validateBody(CustomerRegisterRequestDto), authController.register);

router.post("/email/request", validateBody(EmailVerificationRequestDto), authController.emailVerification);

router.post("/email/verify", validateBody(VerifyEmailRequestDto), authController.verifyEmail);

router.post("/password/forgot", validateBody(ForgotPasswordRequestDto) ,authController.forgotPassword);

router.post("/password/reset", validateBody(ResetPasswordRequestDto) ,authController.resetPassword);

export default router;