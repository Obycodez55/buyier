import { Router } from "express";
import { MerchantRepository } from "../../repositories/merchant.repository";
import { WinstonLogger } from "../../utils/logger/winston.logger";
import { BcryptService } from "../../utils/bcrypt/bcrypt.service";
import { JWTService } from "../../utils/jwt/jwt.service";
import { AuthService } from "../../services/auth/auth.service";
import { AuthController } from "../../controllers/auth.controller";
import { validateBody } from "../../utils/middlewares/validator.middleware";
import { LoginRequestDto } from "../../dtos/authDtos/loginRequest.dto";
import { MerchantRegisterRequestDto } from "../../dtos/authDtos/merchantRegisterRequest.dto";
import { EmailVerificationRequestDto } from "../../dtos/authDtos/emailVerificationRequest.dto";
import { VerifyEmailRequestDto } from "../../dtos/authDtos/verifyEmailRequest.dto";
import { ForgotPasswordRequestDto } from "../../dtos/authDtos/forgotPasswordRequest.dto";
import { ResetPasswordRequestDto } from "../../dtos/authDtos/resetPasswordRequest.dto";


// Customer Auth Service Independents Routes
const merchantRepository = new MerchantRepository();
const logger = new WinstonLogger("MerchantAuthService");
const bcryptService = new BcryptService();
const jwtService = new JWTService();

const merchantAuthService = new AuthService(logger, bcryptService, jwtService, {
    context: "Merchant",
    userRepository: merchantRepository
});
const authController = new AuthController(merchantAuthService);

const router = Router();

router.post("/login", validateBody(LoginRequestDto) ,authController.login);

router.post("/register", validateBody(MerchantRegisterRequestDto), authController.register);

router.post("/email/request", validateBody(EmailVerificationRequestDto), authController.emailVerification);

router.post("/email/verify", validateBody(VerifyEmailRequestDto), authController.verifyEmail);

router.post("/password/forgot", validateBody(ForgotPasswordRequestDto) ,authController.forgotPassword);

router.post("/password/reset", validateBody(ResetPasswordRequestDto) ,authController.resetPassword);

export default router;