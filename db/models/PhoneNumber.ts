import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Customer } from "./Customer";
import { Merchant } from "./Merchant";

const sequelize = databaseService.sequelize;
export class PhoneNumber extends Model { }

PhoneNumber.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    customerId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Customer",
            key: "id",
        }
    },
    merchantId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Merchant",
            key: "id",
        }
    },
    phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: "PhoneNumber",
    validate: {
        eitherCustomerIdOrMerchantId() {
            if ((this.customerId && this.merchantId) || (!this.customerId && !this.merchantId)) {
                throw new Error('Either customerId or merchantId must be provided, but not both.');
            }
        }
    }
})

// Define Relationships
PhoneNumber.belongsTo(Customer, {foreignKey: "customerId", as: "customer"});
PhoneNumber.belongsTo(Merchant, {foreignKey: "merchantId", as: "merchant"});