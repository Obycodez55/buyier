import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Address } from "./Address.model";
import { MerchantVerification } from "./MerchantVerification.model";
import { PhoneNumber } from "./PhoneNumber.model";
import { Product } from "./Product.model";
import { Optional } from "sequelize";

export interface IMerchant {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    brandName: string;
    password: string;
    dateOfBirth?: Date;
    type: "INDIVIDUAL" | "COMPANY";
    emailVerifiedAt?: Date;
    emailVerificationCode?: string;
    passwordResetCode?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface IMerchantCreation extends Optional<IMerchant, "id" | "createdAt" | "updatedAt"> { }


@Table({
    modelName: "Merchant",
    paranoid: true,
    timestamps: true,
    version: true,
    indexes: [
        {
            unique: true,
            fields: ["email", "brandName"],
        },
    ],
})
export class Merchant extends Model<IMerchant, IMerchantCreation> {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: string;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    declare email: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare firstName: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare lastName: string;

    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    declare brandName: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare password: string;

    @Column({
        type: DataType.DATE,
    })
    declare dateOfBirth: Date;

    @Column({
        allowNull: false,
        type: DataType.ENUM("INDIVIDUAL", "COMPANY"),
    })
    declare type: "INDIVIDUAL" | "COMPANY";

    @Column({
        type: DataType.DATE,
    })
    declare emailVerifiedAt: Date;

    @HasMany(() => Address, { foreignKey: "merchantId", as: "addresses" })
    declare addresses: Address[];

    @HasMany(() => PhoneNumber, { foreignKey: "merchantId", as: "phoneNumbers" })
    declare phoneNumbers: PhoneNumber[];

    @HasMany(() => MerchantVerification, { foreignKey: "merchantId", as: "verifications" })
    declare verifications: MerchantVerification[];

    @HasMany(() => Product, { foreignKey: "merchantId", as: "products" })
    declare products: Product[];
}
