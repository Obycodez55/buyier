import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Customer } from "./Customer.model";
import { Delivery } from "./Delivery.model";
import { TransactionProduct } from "./TransactionProduct.model";

const sequelize = databaseService.sequelize;
export class Transaction extends Model { }

Transaction.init({
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
    deliveryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Delivery",
            key: "id",
        }
    },
    deliveryFee: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    productsAmount: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    totalAmount: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: "Transaction",
    timestamps: false,
})

// Define Relationships
Transaction.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
Transaction.hasOne(Delivery, { foreignKey: "deliveryId", as: "delivery" });
Transaction.hasMany(TransactionProduct, { foreignKey: "transactionId", as: "products" });