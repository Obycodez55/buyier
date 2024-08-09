import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Code } from "./Code.model";
import { Address } from "./Address.model";
import { MerchantVerification } from "./MerchantVerification.model";
import { PhoneNumber } from "./PhoneNumber.model";
import { Product } from "./Product.model";

// Import Related Models


@Table({
    modelName: "Merchant",
    paranoid: true,
    timestamps: true,
    version: true,
})
export class Merchant extends Model {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: number;

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
        allowNull: false,
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    declare emailVerified: boolean;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    declare isDeleted: boolean;

    @HasMany(() => Code, { foreignKey: "merchantId", as: "codes" })
    declare codes: Code[];

    @HasMany(() => Address, { foreignKey: "merchantId", as: "addresses" })
    declare addresses: Address[];

    @HasMany(() => PhoneNumber, { foreignKey: "merchantId", as: "phoneNumbers" })
    declare phoneNumbers: PhoneNumber[];

    @HasMany(() => MerchantVerification, { foreignKey: "merchantId", as: "verifications" })
    declare verifications: MerchantVerification[];

    @HasMany(() => Product, { foreignKey: "merchantId", as: "products" })
    declare products: Product[];
}
