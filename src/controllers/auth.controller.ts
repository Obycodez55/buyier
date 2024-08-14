import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { AuthService } from "../services/auth/auth.service";
import { LoginRequestDto } from "../dtos/authDtos/loginRequest.dto";
import { ResponseDto } from "../dtos/response.dto";
import { ResponseStatus } from "../dtos/interfaces/response.interface";
import { SuccessMessages } from "../constants/success-messages.enum";
import { ResetPasswordRequestDto } from "../dtos/authDtos/resetPasswordRequest.dto";
import { ForgotPasswordRequestDto } from "../dtos/authDtos/forgotPasswordRequest.dto";
import { EmailVerificationRequestDto } from "../dtos/authDtos/emailVerificationRequest.dto";
import { VerifyEmailRequestDto } from "../dtos/authDtos/verifyEmailRequest.dto";

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
   * Authenticates User
   * @param request {Request}
   * @param response (Response
   * @param next {NextFunction}
   * @returns {Response}
   */

    login: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.authService.login(request.body as LoginRequestDto);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.LOGIN_SUCCESSFUL, result);
            return response.status(httpStatus.OK).send(resObj);
        } catch (e) {
            next(e);
        }
    }

    /**
   * Register New User
   * @param request {Request}
   * @param response (Response
   * @param next {NextFunction}
   * @returns {Response}
   */

    register: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.authService.register(request.body);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.REGISTRATION_SUCCESSFUL, result);
            response.status(httpStatus.CREATED).send(resObj);
        } catch (e) {
            next(e);
        }
    }

     /**
   * Email Verification Email
   * @param request {Request}
   * @param response (Response
   * @param next {NextFunction}
   * @returns {Response}
   */
  emailVerification: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await this.authService.emailVerification(request.body as EmailVerificationRequestDto);
      const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.EMAIL_VERIFICATION_EMAIL_SENT, result);
      response.status(httpStatus.OK).send(resObj);
    } catch (e) {
      next(e);
    }
}

  /**
   * Verify Email
   * @param request {Request}
   * @param response (Response
   * @param next {NextFunction}
   * @returns {Response}
   */

    verifyEmail: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.authService.verifyEmail(request.body as VerifyEmailRequestDto);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.EMAIL_VERIFICATION_SUCCESS, result);
            response.status(httpStatus.OK).send(resObj);
        } catch (e) {
            next(e);
        }
    }
    

    /**
   * Forgot Password
   * @param request {Request}
   * @param response (Response
   * @param next {NextFunction}
   * @returns {Response}
   */

    forgotPassword: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.authService.forgotPassword(request.body as ForgotPasswordRequestDto);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.FORGOT_PASSWORD_SUCCESS, result);
            response.status(httpStatus.OK).send(resObj);
        } catch (e) {
            next(e);
        }
    }

    /**
 * Resets user password
 * @param request {Request}
 * @param response (Response
 * @param next {NextFunction}
 * @returns {Response}
 */
    resetPassword: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.authService.resetPassword(request.body as ResetPasswordRequestDto);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.RESET_PASSWORD_SUCCESS, result);
            response.status(httpStatus.OK).send(resObj);
        } catch (e) {
            next(e);
        }
    }

}