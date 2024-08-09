import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Code } from "./Code.model";
import { Address } from "./Address.model";
import { CartProduct } from "./CartProduct.model";
import { PhoneNumber } from "./PhoneNumber.model";
import { Delivery } from "./Delivery.model";
import { Transaction } from "./Transaction.model";
import { Rating } from "./Rating.model";

// Import Related Models

@Table({ 
    modelName: "Customer",
    paranoid: true,
    timestamps: true,
 })
export class Customer extends Model<Customer> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
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
    declare password: string;

    @Column({
        type: DataType.DATE,
    })
    declare dateOfBirth: Date;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    declare emailVerified: boolean;

    @HasMany(() => Code, { foreignKey: "customerId", as: "codes" })
    declare codes: Code[];

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