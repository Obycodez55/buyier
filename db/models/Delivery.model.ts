import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Transaction } from "./Transaction.model";
import { Customer } from "./Customer.model";

// Import Related Models

@Table({
    modelName: "Delivery",
    timestamps: false,
    version: true,
})
export class Delivery extends Model {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: number;

    @ForeignKey(() => Customer)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare customerId: number;

    @ForeignKey(() => Transaction)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare transactionId: number;

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

    @Column({
        allowNull: false,
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    declare date: Date;

    @BelongsTo(() => Customer, { foreignKey: "customerId", as: "customer" })
    declare customer: Customer;

    @HasOne(() => Transaction, { foreignKey: "transactionId", as: "transaction" })
    declare transaction: Transaction;
}
