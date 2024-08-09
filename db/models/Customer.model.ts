import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Code } from "./Code.model";
import { Address } from "./Address.model";
import { CartProduct } from "./CartProduct.model";
import { PhoneNumber } from "./PhoneNumber.model";
import { Delivery } from "./Delivery.model";
import { Transaction } from "./Transaction.model";
import { Rating } from "./Rating.model";

const sequelize = databaseService.sequelize;
export class Customer extends Model { }

Customer.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    dateOfBirth: {
        type: DataTypes.DATE,
    },
    emailVerified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isDeleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: "Customer"
})

// Define Relationships
Customer.hasMany(Code, { foreignKey: "customerId", as: "codes" });
Customer.hasMany(Address, { foreignKey: "customerId", as: "addresses" });
Customer.hasMany(CartProduct, { foreignKey: "customerId", as: "cart" });
Customer.hasMany(PhoneNumber, { foreignKey: "customerId", as: "phoneNumbers" });
Customer.hasMany(Delivery, { foreignKey: "customerId", as: "deliveries" });
Customer.hasMany(Transaction, { foreignKey: "customerId", as: "transactions" });
Customer.hasMany(Rating, { foreignKey: "customerId", as: "ratings" });