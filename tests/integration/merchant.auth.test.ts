import request from "supertest";
import app from "../../src/app";
import { ResponseStatus } from "../../src/dtos/interfaces/response.interface";
import { SuccessMessages } from "../../src/constants/success-messages.enum";
import httpStatus from "http-status";
import { ErrorMessages } from "../../src/constants/error-messages.enum";
import { LoginRequestDto } from "../../src/dtos/authDtos/loginRequest.dto";
import { EmailVerificationRequestDto } from "../../src/dtos/authDtos/emailVerificationRequest.dto";
import { VerifyEmailRequestDto } from "../../src/dtos/authDtos/verifyEmailRequest.dto";
import { ForgotPasswordRequestDto } from "../../src/dtos/authDtos/forgotPasswordRequest.dto";
import { ResetPasswordRequestDto } from "../../src/dtos/authDtos/resetPasswordRequest.dto";
import { Merchant } from "../../db/models/Merchant.model";
import { MerchantRegisterRequestDto } from "../../src/dtos/authDtos/merchantRegisterRequest.dto";


describe("Merchant Authentication Module", () => {
    afterAll(async () => {
        await Merchant.destroy({ where: { email: "calvinsmithy55@gmail.com" } })
    });

    describe("Merchant Registration", () => {
        it("should return true", async () => {
            const registerData: MerchantRegisterRequestDto = {
                email: "calvinsmithy55@gmail.com",
                password: "P@assword1234",
                firstName: "Calvin",
                lastName: "Smith",
                brandName: "Calvin's Store",
                type: "COMPANY"
            };
            const response = await request(app).post("/api/v1/auth/merchant/register").send(registerData).set("Accept", "application/json");
            expect.assertions(4);
            expect(response.status).toBe(httpStatus.CREATED);
            expect(response.body.status).toBe(ResponseStatus.SUCCESS);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe(SuccessMessages.REGISTRATION_SUCCESSFUL);
        });

        it("should throw an error if the email already exists", async () => {
            const registerData: MerchantRegisterRequestDto = {
                email: "calvinsmithy55@gmail.com",
                password: "P@assword1234",
                firstName: "Calviny",
                lastName: "Smithy",
                brandName: "Calvin's Store",
                type: "COMPANY"
            };
            const response = await request(app).post("/api/v1/auth/merchant/register").send(registerData).set("Accept", "application/json");
            expect.assertions(4);
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe(ErrorMessages.EMAIL_EXISTS);
        });

        it("should throw an error if any of the validation is not met", async () => {
            const registerData: MerchantRegisterRequestDto = {
                email: "calvinsmithy",
                password: "password",
                firstName: "",
                lastName: "",
                brandName: "Calvin's Store",
                type: "COMPANY"
            };
            const response = await request(app).post("/api/v1/auth/merchant/register").send(registerData).set("Accept", "application/json");
            expect.assertions(3);
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
        })
    });

    describe("Merchant Login", () => {
        it("should send token if credentials are correct", async () => {
            const loginData: LoginRequestDto = {
                email: "calvinsmithy55@gmail.com",
                password: "P@assword1234",
            };
            const response = await request(app).post("/api/v1/auth/merchant/login").send(loginData).set("Accept", "application/json");
            expect.assertions(6);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body.status).toBe(ResponseStatus.SUCCESS);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe(SuccessMessages.LOGIN_SUCCESSFUL);
            expect(response.body.data).toBeDefined();
            expect(response.body.data).toHaveProperty("token");
        });

        it("should throw an error if credentials are incorrect", async () => {
            const loginData: LoginRequestDto = {
                email: "calvinsmithy5@gmail.com",
                password: "P@assword1234",
            };
            const response = await request(app).post("/api/v1/auth/merchant/login").send(loginData).set("Accept", "application/json");
            expect.assertions(4);
            expect(response.status).toBe(httpStatus.UNAUTHORIZED);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe(ErrorMessages.INVALID_EMAIL_PASSWORD);
        });

        it("should throw an error if any of the validation is not met", async () => {
            const loginData: LoginRequestDto = {
                email: "calvinsmithy",
                password: "password",
            };
            const response = await request(app).post("/api/v1/auth/merchant/login").send(loginData).set("Accept", "application/json");
            expect.assertions(3);
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
        })

    });
    describe("Merchant Email Verification", () => {
        it("should return true", async () => {
            const data: EmailVerificationRequestDto = {
                email: "calvinsmithy55@gmail.com"
            }
            const response = await request(app).post("/api/v1/auth/merchant/email/request").send(data);
            expect.assertions(5);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body.status).toBe(ResponseStatus.SUCCESS);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe(SuccessMessages.EMAIL_VERIFICATION_EMAIL_SENT);
            expect(response.body.data).toBeDefined();
        });

        it("should throw an error if email does not exist", async () => {
            const data: EmailVerificationRequestDto = {
                email: "test@test.gmail"
            }
            const response = await request(app).post("/api/v1/auth/merchant/email/request").send(data);
            expect.assertions(4);
            expect(response.status).toBe(httpStatus.NOT_FOUND);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe(ErrorMessages.MERCHANT_NOT_FOUND);
        });

        it("should throw an error if any of the validation is not met", async () => {
            const data: EmailVerificationRequestDto = {
                email: "calvinsmithy"
            }
            const response = await request(app).post("/api/v1/auth/merchant/email/request").send(data);
            expect.assertions(3);
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
        });

    });

    describe("Merchant Verify Email Request", () => {
        it("should throw an error if invalid if invalid token is sent", async () =>{
            const data : VerifyEmailRequestDto = {
                token: "sdg;jvjdbshgaJKGVGVD638"
            };
            const response = await request(app).post("/api/v1/auth/merchant/email/verify").send(data);
            expect.assertions(4);
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe(ErrorMessages.INVALID_VERIFICATION_TOKEN)
        });
        
        it("should throw an error if any of the validation is not met", async () => {
            const data: VerifyEmailRequestDto = {
                token: "",
            };
            const response = await request(app).post("/api/v1/auth/merchant/email/request").send(data);
            expect.assertions(3);
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
        });
    });

    describe("Forgotten Password Request", () => {
        it("should return true", async () => {
            const data: ForgotPasswordRequestDto = {
                email: "calvinsmithy55@gmail.com"
            }
            const response = await request(app).post("/api/v1/auth/merchant/password/forgot").send(data);
            expect.assertions(5);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body.status).toBe(ResponseStatus.SUCCESS);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe(SuccessMessages.FORGOT_PASSWORD_SUCCESS);
            expect(response.body.data).toBeDefined();
        });

        it("should throw an error if email does not exist", async () => {
            const data: ForgotPasswordRequestDto = {
                email: "test@test.gmail"
            }
            const response = await request(app).post("/api/v1/auth/merchant/password/forgot").send(data);
            expect.assertions(4);
            expect(response.status).toBe(httpStatus.NOT_FOUND);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe(ErrorMessages.MERCHANT_NOT_FOUND);
        });

        it("should throw an error if any of the validation is not met", async () => {
            const data: ForgotPasswordRequestDto = {
                email: "calvinsmithy"
            }
            const response = await request(app).post("/api/v1/auth/merchant/password/forgot").send(data);
            expect.assertions(3);
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
        });

    });

    describe("Merchant Verify Email Request", () => {
        it("should throw an error if invalid if invalid token is sent", async () =>{
            const data : ResetPasswordRequestDto = {
                token: "sdg;jvjdbshgaJKGVGVD638",
                newPassword: "P@assword1234"
            };
            const response = await request(app).post("/api/v1/auth/merchant/password/reset").send(data);
            expect.assertions(4);
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
            expect(response.body.message).toBe(ErrorMessages.INVALID_VERIFICATION_TOKEN)
        });
        
        it("should throw an error if any of the validation is not met", async () => {
            const data: ResetPasswordRequestDto = {
                token: "",
                newPassword: ""
            };
            const response = await request(app).post("/api/v1/auth/merchant/password/forgot").send(data);
            expect.assertions(3);
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.status).toBe(ResponseStatus.ERROR);
            expect(response.body.message).toBeDefined();
        });
    });
})