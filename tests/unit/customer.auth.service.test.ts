import httpStatus from "http-status";
import { LoginRequestDto } from "../../src/dtos/authDtos/loginRequest.dto";
import { CustomerRepository } from "../../src/repositories/customer.repository";
import { CustomerAuthService } from "../../src/services/auth/customer.auth.service";
import { BcryptService } from "../../src/utils/bcrypt/bcrypt.service";
import HttpException from "../../src/utils/exceptions/http.exception";
import { JWTService } from "../../src/utils/jwt/jwt.service";
import { WinstonLogger } from "../../src/utils/logger/winston.logger";
import { MockCustomerRepository } from "./mocks/mock-customer.repository";
import { ErrorMessages } from "../../src/constants/error-messages.enum";
import { LoginResponseDto } from "../../src/dtos/authDtos/loginResponse.dto";

let customerAuthService: CustomerAuthService;

describe("CustomerAuthService", () => {
    beforeAll(() => {
        const mockCustomerRepository = new MockCustomerRepository();
        const bcryptService = new BcryptService();
        const jwtService = new JWTService();
        const logger = new WinstonLogger("CustomerAuthServiceTest");
        customerAuthService = new CustomerAuthService(<CustomerRepository>mockCustomerRepository, logger, bcryptService, jwtService);
    });
    describe("CustomerAuthService should be defined", () => {
        it("should be defined", () => {
            expect(customerAuthService).toBeDefined();
        });
    });

    describe("Customer Login", () => {
        it("should throw an error if email does not exist", async () => {
            const loginData: LoginRequestDto = {
                email: "johndoe1@gmail.com",
                password: "Password@123456",
            };
            expect.assertions(3);
            const expectedResponse = await expect(customerAuthService.login(loginData));
            expectedResponse.rejects.toBeInstanceOf(HttpException);
            expectedResponse.rejects.toHaveProperty("message", ErrorMessages.INVALID_EMAIL_PASSWORD);
            expectedResponse.rejects.toHaveProperty("status", httpStatus.UNAUTHORIZED);
        });

        it("should throw an error if password is incorrect", async () => {
            const loginData: LoginRequestDto = {
                email: "johndoe@gmail.com",
                password: "Password@123",
            };
            expect.assertions(3);
            const expectedResponse = await expect(customerAuthService.login(loginData));
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
            await expect(customerAuthService.login(loginData)).resolves.toBeInstanceOf(LoginResponseDto);
            await expect(customerAuthService.login(loginData)).resolves.toHaveProperty('token');
        });
    });
});