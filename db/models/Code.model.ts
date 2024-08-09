import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Customer } from "./Customer.model";
import { Merchant } from "./Merchant.model";

const sequelize = databaseService.sequelize;
export class Code extends Model { }

Code.init({
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
    type: {
        allowNull: false,
        type: DataTypes.ENUM('EMAIL', 'PASSWORD_RESET')
    },
    code: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
            len: [4, 6]
        },
    },
    expires: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: () => new Date(new Date().getTime() + 15 * 60 * 1000)
    }
}, {
    sequelize,
    modelName: "Code",
    validate: {
        eitherCustomerIdOrMerchantId() {
            if ((this.customerId && this.merchantId) || (!this.customerId && !this.merchantId)) {
                throw new Error('Either customerId or merchantId must be provided, but not both.');
            }
        }
    }
})

// Define Relationships
Code.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
Code.belongsTo(Merchant, { foreignKey: "merchantId", as: "merchant" });