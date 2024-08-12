import { Sequelize } from "sequelize-typescript";
import { ILogger } from "../logger/logger.interface";
import { DbDialectType } from './db-dialect.type';
import { WinstonLogger } from "../logger/winston.logger";
import { configService } from "../config/config.service";
import { Customer } from "../../../db/models/Customer.model";
import { Address } from "../../../db/models/Address.model";
import { CartProduct } from "../../../db/models/CartProduct.model";
import { Merchant } from "../../../db/models/Merchant.model";
import { Delivery } from "../../../db/models/Delivery.model";
import { MerchantVerification } from "../../../db/models/MerchantVerification.model";
import PhoneNumber from "../../../db/models/PhoneNumber.model";
import { Product } from "../../../db/models/Product.model";
import { ProductImage } from "../../../db/models/ProductImage.model";
import Rating from "../../../db/models/Rating.model";
import { Transaction } from "../../../db/models/Transaction.model";
import TransactionProduct from "../../../db/models/TransactionProduct.model";

export class DatabaseService {
    readonly sequelize: Sequelize;
    private logger: ILogger;

    constructor(dialect: DbDialectType) {
        this.logger = new WinstonLogger("DatabaseService");
        // this.sequelize = new Sequelize(
        //     configService.get<string>("DB_NAME")!,
        //     configService.get<string>("DB_USER")!,
        //     configService.get<string>("DB_PASSWORD"),
        //     {
        //         host: configService.get<string>("DB_HOST"),
        //         dialect
        //     }
        // );
        this.sequelize = new Sequelize({
            database: configService.get<string>("DB_NAME")!,
            username: configService.get<string>("DB_USER")!,
            password: configService.get<string>("DB_PASSWORD"),
            host: configService.get<string>("DB_HOST"),
            dialect,
            logging: false,
            // models: [__dirname + '/../../**/*.model.ts'],
            // models: [__dirname + "../../db/"],
        });
        this.sequelize.addModels([Address, Customer, CartProduct, Merchant, Delivery, MerchantVerification, PhoneNumber, Product, ProductImage, Rating, Transaction, TransactionProduct]);
    }

    authenticate(force = false): void {
        this.sequelize
            .authenticate()
            .then(() => {
                this.logger.info("Connection has been established successfully.");
                this.sequelize.sync({ force })
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