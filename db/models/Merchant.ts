import { DataTypes, Model } from "sequelize";
import { databaseService } from "../../src/utils/database";

// Import Related Models
import { Code } from "./Code";
import { Address } from "./Address";
import { MerchantVerification } from "./MerchantVerification";
import { PhoneNumber } from "./PhoneNumber";
import { Product } from "./Product";

const sequelize = databaseService.sequelize;
export class Merchant extends Model { }

Merchant.init({
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
    brandName: {
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
    type: {
        allowNull: false,
        type: DataTypes.ENUM("INDIVIDUAL", "COMPANY"),
    },
    emailVerified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isDeleted: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: "Merchant"
})

// Define Relationships
Merchant.hasMany(Code, {foreignKey: "merchantId", as: "codes"});
Merchant.hasMany(Address, {foreignKey: "merchantId", as: "addresses"});
Merchant.hasMany(PhoneNumber, {foreignKey: "merchantId", as: "phoneNumbers"});
Merchant.hasMany(MerchantVerification, {foreignKey: "merchantId", as: "verifications"});
Merchant.hasMany(Product, {foreignKey: "merchantId", as: "products"});