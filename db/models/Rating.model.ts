import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "./Product.model";
import { Customer } from "./Customer.model";
import { Optional } from "sequelize";

export interface IRating {
    id: string;
    productId: string;
    customerId: string;
    rating: number;
    review: string;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRatingCreation extends Optional<IRating, "id" | "createdAt" | "updatedAt"> {}

@Table({ modelName: "Rating",
timestamps: true,
paranoid: true,
version: true,
 })
export class Rating extends Model<IRating, IRatingCreation> {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: string;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare productId: string;

    @ForeignKey(() => Customer)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare customerId: string;

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
