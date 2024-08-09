import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "./Product.model";
import { Transaction } from "./Transaction.model";

// Import Related Models

@Table({ modelName: "TransactionProduct", timestamps: false })
export class TransactionProduct extends Model<TransactionProduct> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Transaction)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    declare transactionId: number;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    declare productId: number;

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

    @Column({
        allowNull: false,
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    declare date: Date;

    @BelongsTo(() => Product, { foreignKey: "productId", as: "product" })
    declare product: Product;

    @BelongsTo(() => Transaction, { foreignKey: "transactionId", as: "transaction" })
    declare transaction: Transaction;
}

export default TransactionProduct;
