import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Product } from "./Product.model";

@Table({ modelName: "ProductImage" })
export class ProductImage extends Model<ProductImage> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Product)
    @Column({
        allowNull: false,
        type: DataTypes.INTEGER,
    })
    declare productId: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    declare image: string;

    @BelongsTo(() => Product, { foreignKey: "productId", as: "product" })
    declare product: Product;
}
