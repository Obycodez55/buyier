import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "./Product.model";
import { Customer } from "./Customer.model";

@Table({ modelName: "Rating" })
export class Rating extends Model<Rating> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    declare productId: number;

    @ForeignKey(() => Customer)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
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
