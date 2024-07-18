import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Customer } from "./Customer";
import { Product } from "./Product";

const sequelize = databaseService.sequelize;
export class CartProduct extends Model { }

CartProduct.init({
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
    }
}, {
    sequelize,
    modelName: "CartProduct",
})

// Define Relationships
CartProduct.belongsTo(Customer, {foreignKey: "customerId", as: "customer"});
CartProduct.belongsTo(Product, {foreignKey: "productId", as: "product"});