import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Merchant } from "./Merchant.model";

const sequelize = databaseService.sequelize;
export class MerchantVerification extends Model { }

MerchantVerification.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    merchantId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Merchant",
            key: "id",
        }
    },
    type: {
        allowNull: false,
        type: DataTypes.ENUM("BUSINESS_REGISTRATION", "IDENTITY_VERIFICATION"),
    },
    scope: {
        allowNull: false,
        type: DataTypes.ENUM("NIN", "CAC", "UTILITY_BILL", "PASSPORT", "DRIVERS_LICENSE"),
    },
    document: {
        type: DataTypes.STRING,
    },
    status: {
        allowNull: false,
        type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
        defaultValue: "PENDING",
    },
    dateOfApproval: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    modelName: "MerchantVerification",
    createdAt: "dateOfApplication"
})

// Define Relationships
MerchantVerification.belongsTo(Merchant, { foreignKey: "merchantId", as: "merchant" });