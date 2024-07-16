export enum LoggerPath {
    DatabaseService = "logs/database-connection.log",
    NodemailerEmailService = "logs/email-service.log",
}

export interface LoggerPathIndex {
    [key: string]: LoggerPath;
}