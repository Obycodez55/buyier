import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Customer } from "./Customer.model";
import { Product } from "./Product.model";

@Table({
    modelName: "CartProduct",
    paranoid: true,
    timestamps: true,
    version: true,
})
export class CartProduct extends Model {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: number;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare customerId: number;

    @ForeignKey(() => Product)
    @Column({
        type: DataType.UUID,
        allowNull: false,
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

    @BelongsTo(() => Customer)
    declare customer: Customer;

    @BelongsTo(() => Product)
    declare product: Product;
}
