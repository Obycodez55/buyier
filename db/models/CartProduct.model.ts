import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Customer } from "./Customer.model";
import { Product } from "./Product.model";

export interface ICartProduct {
    id: string;
    customerId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface ICartProductCreation extends Omit<ICartProduct, "id" | "createdAt" | "updatedAt"> { }

@Table({
    modelName: "CartProduct",
    paranoid: true,
    timestamps: true,
    version: true,
})
export class CartProduct extends Model<ICartProduct, ICartProductCreation> {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: string;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare customerId: string;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.UUID,
        allowNull: false,
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

    @BelongsTo(() => Customer)
    declare customer: Customer;

    @BelongsTo(() => Product)
    declare product: Product;
}
