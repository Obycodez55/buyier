import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasOne } from "sequelize-typescript";
import { Transaction } from "./Transaction.model";
import { Customer } from "./Customer.model";

// Import Related Models

@Table({ modelName: "Delivery", timestamps: false })
export class Delivery extends Model<Delivery> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Customer)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    declare customerId: number;

    @ForeignKey(() => Transaction)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
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
