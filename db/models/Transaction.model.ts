import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany, BeforeCreate, BeforeUpdate } from "sequelize-typescript";
import { Customer } from "./Customer.model";
import { Delivery } from "./Delivery.model";
import { TransactionProduct } from "./TransactionProduct.model";
import { Optional } from "sequelize";

export interface ITransaction {
    id: string;
    customerId: string;
    deliveryId: string;
    deliveryFee: number;
    productsAmount: number;
    totalAmount: number;
    date: Date;
    deletedAt?: Date;
}

export interface ITransactionCreation extends Optional<ITransaction, "id" | "productsAmount" | "totalAmount"> {}

@Table({ modelName: "Transaction", 
    timestamps: false,
    paranoid: true,
    version: true,
    createdAt: "date",
})
export class Transaction extends Model{
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

    @BelongsTo(() => Customer, "customerId")
    declare customer: Customer;

    @ForeignKey(() => Delivery)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare deliveryId: string;

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

    @HasMany(() => TransactionProduct, "transactionId")
    declare products: TransactionProduct[];

    @BeforeCreate
    @BeforeUpdate
    static async calculateTotalAmount(transaction: Transaction) {
        let totalAmount = 0;
        for (const product of transaction.products) {
            totalAmount += product.totalAmount * product.quantity;
        }
        transaction.productsAmount = totalAmount;
        transaction.totalAmount = totalAmount + transaction.deliveryFee;
    }
}
