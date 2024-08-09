import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Customer } from "./Customer.model";
import { Delivery } from "./Delivery.model";
import { TransactionProduct } from "./TransactionProduct.model";

@Table({ modelName: "Transaction", 
    timestamps: false,
    paranoid: true,
    version: true,
})
export class Transaction extends Model{
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

    @BelongsTo(() => Customer, "customerId")
    declare customer: Customer;

    @ForeignKey(() => Delivery)
    @Column({
        allowNull: false,
        type: DataType.UUID,
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
