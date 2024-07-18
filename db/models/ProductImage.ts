import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Product } from "./Product";

const sequelize = databaseService.sequelize;
export class ProductImage extends Model { }

ProductImage.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references : {
            model: "Product",
            key: "id",
        }
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: "ProductImage"
})

// Define Relationships
ProductImage.belongsTo(Product, {foreignKey: "productId", as: "product"});