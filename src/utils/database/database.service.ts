import { Sequelize } from "sequelize";
import { ILogger } from "../logger/logger.interface";
import { DbDialectType } from './db-dialect.type';
import { WinstonLogger } from "../logger/winston.logger";
import { configService } from "../config/config.service";

export class DatabaseService {
    readonly sequelize: Sequelize;
    private logger: ILogger;

    constructor(dialect: DbDialectType) {
        this.logger = new WinstonLogger("DatabaseService");
        this.sequelize = new Sequelize(
            configService.get<string>("DB_NAME")!,
            configService.get<string>("DB_USER")!,
            configService.get<string>("DB_PASSWORD"),
            {
                host: configService.get<string>("DB_HOST"),
                dialect
            }
        );
    }

    authenticate() {
        this.sequelize
            .authenticate()
            .then(() => {
                this.logger.info("Connection has been established successfully.");
                this.sequelize.sync({ force: true })
                    .then(() => {
                        this.logger.info("All models were synchronized successfully.");
                    })
                    .catch(err => {
                        this.logger.error("An error occurred while synchronizing the models:", err);
                        process.exit(0);
                    });
            })
            .catch(err => {
                this.logger.error("Unable to connect to the database:", err);
                process.exit(0);
            });
    }


}