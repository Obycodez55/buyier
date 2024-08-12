import { google } from "googleapis";
import { WinstonLogger } from "../logger/winston.logger";
import { IEmailService } from "./email.interface";
import { NodemailerProvider } from "./providers/nodemailer.provider";
import { ILogger } from "../logger/logger.interface";
import { EmailPaths } from "../../constants/email-paths.enum";
import { configService } from "../config/config.service";

class OAuth2Client extends google.auth.OAuth2 { }
export class EmailService implements IEmailService {
    private readonly logger: ILogger;
    private readonly OAuth2Client: OAuth2Client;
    private readonly emailProvider: IEmailService;

    constructor() {
        this.logger = new WinstonLogger("EmailService");
        this.OAuth2Client = new OAuth2Client(
            configService.get<string>("GMAIL_CLIENT_ID"),
            configService.get<string>("GMAIL_CLIENT_SECRET"),
            configService.get<string>("GMAIL_REDIRECT_URI")
        );
        this.OAuth2Client.setCredentials({ refresh_token: configService.get<string>("GMAIL_REFRESH_TOKEN") });
        this.emailProvider = new NodemailerProvider(this.logger, this.OAuth2Client);
    }
    
    // private setEmailProvider(emailProvider: IEmailService): void{
    //     this.emailProvider = emailProvider;
    // }

    public sendMail({ to, subject, options }: { to: string; subject: string; options: { template: EmailPaths; data: { [key: string]: any; }; }; }): Promise<void> {
        return this.emailProvider.sendMail({ to, subject, options });
    }

}