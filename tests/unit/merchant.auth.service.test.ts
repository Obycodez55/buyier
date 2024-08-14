import httpStatus from "http-status";
import { LoginRequestDto } from "../../src/dtos/authDtos/loginRequest.dto";
import { MerchantRepository } from "../../src/repositories/merchant.repository";
import { MerchantAuthService } from "../../src/services/auth/merchant.auth.service";
import { BcryptService } from "../../src/utils/bcrypt/bcrypt.service";
import HttpException from "../../src/utils/exceptions/http.exception";
import { JWTService } from "../../src/utils/jwt/jwt.service";
import { WinstonLogger } from "../../src/utils/logger/winston.logger";
import { MockMerchantRepository } from "./mocks/mock-merchant.repository";
import { ErrorMessages } from "../../src/constants/error-messages.enum";
import { LoginResponseDto } from "../../src/dtos/authDtos/loginResponse.dto";


let merchantAuthService: MerchantAuthService;

describe("MerchantAuthService", () => {
    beforeAll(() => {
        const mockMerchantRepository = new MockMerchantRepository();
        const bcryptService = new BcryptService();
        const jwtService = new JWTService();
        const logger = new WinstonLogger("MerchantAuthServiceTest");
        merchantAuthService = new MerchantAuthService(<MerchantRepository>mockMerchantRepository, logger, bcryptService, jwtService);
    });
    describe("MerchantAuthService should be defined", () => {
        it("should be defined", () => {
            expect(merchantAuthService).toBeDefined();
        });
    });

    describe("Merchant Login", () => {
        it("should throw an error if email does not exist", async () => {
            const loginData: LoginRequestDto = {
                email: "johndoe1@gmail.com",
                password: "Password@123456"
            }
            expect.assertions(3);
            const expectedResponse = await expect(merchantAuthService.login(loginData));
            expectedResponse.rejects.toBeInstanceOf(HttpException);
            expectedResponse.rejects.toHaveProperty("message", ErrorMessages.INVALID_EMAIL_PASSWORD);
            expectedResponse.rejects.toHaveProperty("status", httpStatus.UNAUTHORIZED);
        });

        it("should throw an error if password is incorrect", async () => {
            const loginData: LoginRequestDto = {
                email: "johndoe@gmail.com",
                password: "Password@123"
            }
            expect.assertions(3);
            const expectedResponse = await expect(merchantAuthService.login(loginData));
            expectedResponse.rejects.toBeInstanceOf(HttpException);
            expectedResponse.rejects.toHaveProperty("message", ErrorMessages.INVALID_EMAIL_PASSWORD);
            expectedResponse.rejects.toHaveProperty("status", httpStatus.UNAUTHORIZED);
        });

        it("should return a token if login is successful", async () => {
            const loginData: LoginRequestDto = {
                email: "jonhdoe@gmail.com",
                password: "Password@123456",
            };
            expect.assertions(2);
            await expect(merchantAuthService.login(loginData)).resolves.toBeInstanceOf(LoginResponseDto);
            await expect(merchantAuthService.login(loginData)).resolves.toHaveProperty('token');
        });

    });
});