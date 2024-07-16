import { EmailPaths } from "../../constants/email-paths.enum";

export interface IEmailService {
    sendMail(to: string,
        subject: string,
        options:
            {
                template: EmailPaths,
                data: { [key: string]: any }
            })
        : Promise<void>;
}