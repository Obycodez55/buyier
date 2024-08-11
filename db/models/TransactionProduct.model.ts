import { Model, Table, Column, DataType, ForeignKey, BelongsTo, BeforeCreate, BeforeUpdate } from "sequelize-typescript";
import { Product } from "./Product.model";
import { Transaction } from "./Transaction.model";
import { Optional } from "sequelize";

export interface ITransactionProduct {
    id: string;
    transactionId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    date: Date;
    deletedAt?: Date;
}

export interface ITransactionProductCreation extends Optional<ITransactionProduct, "id" | "date" | "totalAmount"> {}

@Table({
    modelName: "TransactionProduct", 
    timestamps: false,
    paranoid: true,
    version: true,
    createdAt: "date",
})
export class TransactionProduct extends Model<ITransactionProduct, ITransactionProductCreation> {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: string;

    @ForeignKey(() => Transaction)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare transactionId: string;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare productId: string;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    declare quantity: number;

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
    })
    declare unitPrice: number;

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
    })
    declare totalAmount: number;

    @BelongsTo(() => Product, { foreignKey: "productId", as: "product" })
    declare product: Product;

    @BelongsTo(() => Transaction, { foreignKey: "transactionId", as: "transaction" })
    declare transaction: Transaction;

    @BeforeCreate
    @BeforeUpdate
    static setTotalAmount(instance: TransactionProduct) {
        instance.totalAmount = instance.unitPrice * instance.quantity;
    }
}

export default TransactionProduct;
