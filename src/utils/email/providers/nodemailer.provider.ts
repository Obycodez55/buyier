import { google } from "googleapis";
import { IEmailService } from "../email.interface";
import { createTransport, Transport, Transporter } from "nodemailer";
import { configService } from "../../config/config.service";
import { ILogger } from "../../logger/logger.interface";
import { CompanyDetails } from "../../../constants/company-details";
import { EmailPaths } from "../../../constants/email-paths.enum";
import * as ejs from "ejs";
import path from "path";


class OAuth2Client extends google.auth.OAuth2 { }

export class NodemailerProvider implements IEmailService {
    private readonly OAuth2Client: OAuth2Client;
    private readonly transporter: any;
    private logger: ILogger;

    constructor(logger: ILogger, OAuth2Client: OAuth2Client) {
        this.logger = logger;
        this.OAuth2Client = OAuth2Client;
        this.transporter = createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: CompanyDetails.SUPPORT_EMAIL,
                clientId: configService.get<string>("GMAIL_CLIENT_ID"),
                clientSecret: configService.get<string>("GMAIL_CLIENT_SECRET"),
                refreshToken: configService.get<string>("GMAIL_REFRESH_TOKEN"),
            },
        });
    }

    public sendMail({ to, subject, options }: { to: string; subject: string; options: { template: EmailPaths; data: { [key: string]: any; }; }; }): Promise<void> {
        this.transporter.accessToken = this.OAuth2Client.getAccessToken() as any;

        return new Promise<void>((resolve, reject) => {
            const template = path.resolve("view/emails", options.template);
            ejs.renderFile(template, options.data, (error, html) => {
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
                }, (err: any, info: any) => {
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
