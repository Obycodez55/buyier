import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Product } from "./Product.model";
import { Optional } from "sequelize";

export interface IProductImage {
    id: string;
    productId: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface IProductImageCreation extends Optional<IProductImage, "id" | "createdAt" | "updatedAt"> {}

@Table({
    modelName: "ProductImage",
    timestamps: true,
    paranoid: true,
    version: true,
})
export class ProductImage extends Model<IProductImage, IProductImageCreation> {
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

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare image: string;

    @BelongsTo(() => Product, { foreignKey: "productId", as: "product" })
    declare product: Product;
}
