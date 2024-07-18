import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Merchant } from "./Merchant";
import { ProductImage } from "./ProductImage";
import { TransactionProduct } from "./TransactionProduct";
import { CartProduct } from "./CartProduct";


const sequelize = databaseService.sequelize;
export class Product extends Model { }

Product.init({
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
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    displayImage: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    type:{
        allowNull: false,
        type: DataTypes.ENUM("USED", "NEW"),
    },
    price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
    },
    prevPrice: {
        type: DataTypes.DECIMAL(10, 2),
    },
    stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    isDeleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "Product"
})

// Define Relationships
Product.belongsTo(Merchant, {foreignKey: "merchantId", as: "merchant"});
Product.hasMany(ProductImage, {foreignKey: "productId", as: "images"});
Product.hasMany(TransactionProduct, {foreignKey: "productId", as: "transactions"});
Product.hasMany(CartProduct, {foreignKey: "productId", as: "carts"});