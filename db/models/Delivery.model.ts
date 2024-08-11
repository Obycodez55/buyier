import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Transaction } from "./Transaction.model";
import { Customer } from "./Customer.model";
import { Optional } from "sequelize";

export interface IDelivery {
    id: string;
    customerId: string;
    transactionId: string;
    type: 'HOME' | 'PICKUP';
    deliveryFee: number;
    status: 'PENDING' | 'DELIVERED';
    date: Date;
}

export interface IDeliveryCreation extends Optional<IDelivery, "id" | "date"> { }

@Table({
    modelName: "Delivery",
    timestamps: false,
    version: true,
    createdAt: "date",
})
export class Delivery extends Model<IDelivery, IDeliveryCreation> {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: string;

    @ForeignKey(() => Customer)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare customerId: string;

    @ForeignKey(() => Transaction)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare transactionId: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM('HOME', 'PICKUP'),
    })
    declare type: 'HOME' | 'PICKUP';

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
    })
    declare deliveryFee: number;

    @Column({
        allowNull: false,
        type: DataType.ENUM('PENDING', 'DELIVERED'),
    })
    declare status: 'PENDING' | 'DELIVERED';

    @BelongsTo(() => Customer, { foreignKey: "customerId", as: "customer" })
    declare customer: Customer;

    @HasOne(() => Transaction, { foreignKey: "transactionId", as: "transaction" })
    declare transaction: Transaction;
}
