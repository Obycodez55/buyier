import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Address } from "./Address.model";
import { CartProduct } from "./CartProduct.model";
import { PhoneNumber } from "./PhoneNumber.model";
import { Delivery } from "./Delivery.model";
import { Transaction } from "./Transaction.model";
import { Rating } from "./Rating.model";
import { Optional } from "sequelize";

export interface ICustomer{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    dateOfBirth?: Date;
    emailVerifiedAt?: Date;
    emailVerificationCode?: string;
    passwordResetCode?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface ICustomerCreation extends Optional<ICustomer, "id" | "createdAt" | "updatedAt"> {}

@Table({ 
    modelName: "Customer",
    paranoid: true,
    timestamps: true,
    version: true,
    indexes: [
        {
            unique: true,
            fields: ["email"],
        },
    ],
 })
export class Customer extends Model<ICustomer, ICustomerCreation> {
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
        type: DataType.STRING,
    })
    declare password: string;

    @Column({
        type: DataType.DATE,
    })
    declare dateOfBirth: Date;

    @Column({
        type: DataType.DATE,
    })
    declare emailVerifiedAt: Date;

    @HasMany(() => Address, { foreignKey: "customerId", as: "addresses" })
    declare addresses: Address[];

    @HasMany(() => CartProduct, { foreignKey: "customerId", as: "cart" })
    declare cart: CartProduct[];

    @HasMany(() => PhoneNumber, { foreignKey: "customerId", as: "phoneNumbers" })
    declare phoneNumbers: PhoneNumber[];

    @HasMany(() => Delivery, { foreignKey: "customerId", as: "deliveries" })
    declare deliveries: Delivery[];

    @HasMany(() => Transaction, { foreignKey: "customerId", as: "transactions" })
    declare transactions: Transaction[];

    @HasMany(() => Rating, { foreignKey: "customerId", as: "ratings" })
    declare ratings: Rating[];
}