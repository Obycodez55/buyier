import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Product } from "./Product.model";

@Table({
    modelName: "ProductImage",
    timestamps: true,
    paranoid: true,
    version: true,
})
export class ProductImage extends Model {
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

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare image: string;

    @BelongsTo(() => Product, { foreignKey: "productId", as: "product" })
    declare product: Product;
}
