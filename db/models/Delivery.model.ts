import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Transaction } from "./Transaction.model";
import { Customer } from "./Customer.model";

const sequelize = databaseService.sequelize;
export class Delivery extends Model { }

Delivery.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Customer",
            key: "id",
        }
    },
    transactionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Transaction",
            key: "id",
        }
    },
    type: {
        allowNull: false,
        type: DataTypes.ENUM('HOME', 'PICKUP'),
    },
    deliveryFee: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    status: {
        allowNull: false,
        type: DataTypes.ENUM('PENDING', 'DELIVERED'),
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: "Delivery",
    timestamps: false,
})

// Define Relationships
Delivery.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
Delivery.hasOne(Transaction, { foreignKey: "transactionId", as: "transaction" });