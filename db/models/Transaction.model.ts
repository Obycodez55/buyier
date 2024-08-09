import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Customer } from "./Customer.model";
import { Delivery } from "./Delivery.model";
import { TransactionProduct } from "./TransactionProduct.model";

@Table({ modelName: "Transaction", timestamps: false })
export class Transaction extends Model<Transaction> {
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

    @BelongsTo(() => Customer, "customerId")
    declare customer: Customer;

    @ForeignKey(() => Delivery)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    declare deliveryId: number;

    @BelongsTo(() => Delivery, "deliveryId")
    declare delivery: Delivery;

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
    })
    declare deliveryFee: number;

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
    })
    declare productsAmount: number;

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
    })
    declare totalAmount: number;

    @Column({
        allowNull: false,
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    declare date: Date;

    @HasMany(() => TransactionProduct, "transactionId")
    declare products: TransactionProduct[];
}
