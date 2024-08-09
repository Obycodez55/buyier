import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Customer } from "./Customer.model";
import { Product } from "./Product.model";

@Table({
    modelName: "CartProduct",
    paranoid: true,
    timestamps: true,
    version: true,
})
export class CartProduct extends Model<CartProduct> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ForeignKey(() => Customer)
    @Column({
        allowNull: false,
    })
    declare customerId: number;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
    })
    declare productId: number;

    @Column({
        allowNull: false,
    })
    declare quantity: number;

    @Column({
        allowNull: false,
    })
    declare unitPrice: number;

    @Column({
        allowNull: false,
    })
    declare totalAmount: number;

    @BelongsTo(() => Customer)
    declare customer: Customer;

    @BelongsTo(() => Product)
    declare product: Product;
}
