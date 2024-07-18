import { configService } from "../config/config.service";
import { DatabaseService } from "./database.service";
import { DbDialectType } from "./db-dialect.type";


export const databaseService = new DatabaseService(<DbDialectType> configService.get<string>("DB_DIALECT", "mysql"));