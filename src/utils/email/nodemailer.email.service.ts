import { createTransport, Transporter } from "nodemailer";
import { IEmailService } from "./email.interface";
import { google } from "googleapis";
import * as ejs from "ejs";
import { configService } from "../config/config.service";
import { CompanyDetails } from "../../constants/company-details";
import { EmailPaths } from "../../constants/email-paths.enum";
import { ILogger } from "../logger/logger.interface";
import { WinstonLogger } from "../logger/winston.logger";

class OAuth2Client extends google.auth.OAuth2 { }

export class NodemailerEmailService implements IEmailService {
    private readonly oAuth2Client: OAuth2Client;
    private readonly transporter: Transporter;
    private logger: ILogger;

    constructor() {
        this.logger = new WinstonLogger("NodemailerEmailService");
        this.oAuth2Client = new google.auth.OAuth2(
            configService.get<string>("GMAIL_CLIENT_ID"),
            configService.get<string>("GMAIL_CLIENT_SECRET"),
            configService.get<string>("GMAIL_REDIRECT_URI")
        );

        this.oAuth2Client.setCredentials({
            refresh_token: configService.get<string>("GMAIL_REFRESH_TOKEN")
        });
        
        this.transporter = createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: CompanyDetails.SUPPORT_EMAIL,
                clientId: configService.get<string>("GMAIL_CLIENT_ID"),
                clientSecret: configService.get<string>("GMAIL_CLIENT_SECRET"),
                refreshToken: configService.get<string>("GMAIL_REFRESH_TOKEN"),
                accessToken: this.oAuth2Client.getAccessToken() as any,
            },
        });
    }

    public sendMail(to: string, subject: string, options: { template: EmailPaths, data: { [key: string]: any } }): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            ejs.renderFile(options.template, options.data, (error, html) => {
                if (error) {
                    this.logger.error("Error rendering email template", error);
                    reject(error);
                    return;
                }
                this.transporter.sendMail({
                    from: CompanyDetails.SUPPORT_EMAIL,
                    to,
                    subject,
                    html
                }, (err, info) => {
                    if (err) {
                        this.logger.error("Error sending email", err);
                        reject(err);
                        return;
                    }
                    this.logger.info("Email sent successfully", info);
                    resolve();
                });
            });
        });
    }
}
