import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "./Product.model";
import { Customer } from "./Customer.model";

@Table({ modelName: "Rating",
timestamps: true,
paranoid: true,
version: true,
 })
export class Rating extends Model {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: number;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare productId: number;

    @ForeignKey(() => Customer)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare customerId: number;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
        validate: {
            min: 1,
            max: 5
        }
    })
    declare rating: number;

    @Column({
        type: DataType.STRING,
    })
    declare review: string;

    @BelongsTo(() => Product, { foreignKey: "productId", as: "product" })
    declare product: Product;

    @BelongsTo(() => Customer, { foreignKey: "customerId", as: "customer" })
    declare customer: Customer;
}

export default Rating;
