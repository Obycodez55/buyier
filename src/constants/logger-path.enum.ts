export enum LoggerPath {
    DatabaseService = "logs/database-connection.log",
}

export interface LoggerPathIndex {
    [key: string]: LoggerPath;
}