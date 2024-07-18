import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Product } from "./Product";
import { Customer } from "./Customer";

const sequelize = databaseService.sequelize;
export class Rating extends Model { }

Rating.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Product",
            key: "id",
        }
    },
    customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: "Customer",
            key: "id",
        }
    },
    rating: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    },
    review: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: "Rating"
})

// Define Relationships
Rating.belongsTo(Product, {foreignKey: "productId", as: "product"});
Rating.belongsTo(Customer, {foreignKey: "customerId", as: "customer"});