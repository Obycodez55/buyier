import { EmailService } from "../../src/utils/email/email.service";

let emailService: EmailService;

describe("Email Service Test", () => {
    beforeAll(() => {
        emailService = new EmailService();
    });
    describe("EmailService should be defined", () => {
        it("should be defined", () => {
            expect(emailService).toBeDefined();
        });
    });

    

});