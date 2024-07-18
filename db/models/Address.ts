import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Customer } from "./Customer";
import { Merchant } from "./Merchant";

const sequelize = databaseService.sequelize;
export class Address extends Model { }

// Initialize the Address model and define its attributes
Address.init({
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
    address: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    city: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    state: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    postalCode: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    isDeleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: "Address",
    validate: {
        eitherCustomerIdOrMerchantId() {
            if ((this.customerId && this.merchantId) || (!this.customerId && !this.merchantId)) {
                throw new Error('Either customerId or merchantId must be provided, but not both.');
            }
        }
    }
})

// Define the relationships with other models
Address.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
Address.belongsTo(Merchant, { foreignKey: "merchantId", as : "merchant" });