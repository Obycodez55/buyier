import { google } from "googleapis";
import { WinstonLogger } from "../logger/winston.logger";
import { IEmailService } from "./email.interface";
import { NodemailerProvider } from "./providers/nodemailer.provider";
import { ILogger } from "../logger/logger.interface";
import { EmailPaths } from "../../constants/email-paths.enum";

class OAuth2Client extends google.auth.OAuth2 { }
export class EmailService implements IEmailService {
    private readonly logger: ILogger;
    private readonly OAuth2Client: OAuth2Client;
    private readonly emailProvider: IEmailService;

    constructor() {
        this.logger = new WinstonLogger("EmailService");
        this.OAuth2Client = new OAuth2Client();
        this.emailProvider = new NodemailerProvider(this.logger, this.OAuth2Client);
    }
    
    // private setEmailProvider(emailProvider: IEmailService): void{
    //     this.emailProvider = emailProvider;
    // }

    public sendMail(to: string, subject: string, options: { template: EmailPaths; data: { [key: string]: any; }; }): Promise<void> {
        return this.emailProvider.sendMail(to, subject, options);
    }

}