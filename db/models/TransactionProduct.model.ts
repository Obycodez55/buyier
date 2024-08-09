import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Product } from "./Product.model";
import { Transaction } from "./Transaction.model";

const sequelize = databaseService.sequelize;
export class TransactionProduct extends Model { }

TransactionProduct.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    transactionId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Transaction",
            key: "id",
        }
    },
    productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Product",
            key: "id",
        }
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    unitPrice: {
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
    }
}, {
    sequelize,
    modelName: "TransactionProduct",
    timestamps: false,
})

// Define Relationships
TransactionProduct.belongsTo(Product, { foreignKey: "productId", as: "product" });
TransactionProduct.belongsTo(Transaction, { foreignKey: "transactionId", as: "transaction" });