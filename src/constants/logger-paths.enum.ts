export enum LoggerPath {
    DatabaseService = "logs/database-connection.log",
    NodemailerEmailService = "logs/email-service.log",
    CustomerAuthService = "logs/customer-auth-service.log",
    MerchantAuthService = "logs/merchant-auth-service.log",
}

export interface LoggerPathIndex {
    [key: string]: LoggerPath;
}