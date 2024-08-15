import { LoginRequestDto } from "../../dtos/authDtos/loginRequest.dto";
import { LoginResponseDto } from "../../dtos/authDtos/loginResponse.dto";
import { ForgotPasswordRequestDto } from '../../dtos/authDtos/forgotPasswordRequest.dto';
import { EmailVerificationRequestDto } from "../../dtos/authDtos/emailVerificationRequest.dto";
import { VerifyEmailRequestDto } from "../../dtos/authDtos/verifyEmailRequest.dto";
import { ResetPasswordRequestDto } from "../../dtos/authDtos/resetPasswordRequest.dto";

export interface IAuthService {
    login(loginData: LoginRequestDto): Promise<LoginResponseDto>;
    register(registerData: any): Promise<boolean>;
    forgotPassword(forgotPasswordData: ForgotPasswordRequestDto): Promise<boolean>;
    resetPassword(resetPasswordData: ResetPasswordRequestDto): Promise<boolean>;
    emailVerification(emailVerificationData: EmailVerificationRequestDto): Promise<boolean>;
    verifyEmail(verifyEmailData: VerifyEmailRequestDto): Promise<boolean>;
}