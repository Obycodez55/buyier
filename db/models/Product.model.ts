import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Merchant } from "./Merchant.model";
import { ProductImage } from "./ProductImage.model";
import { TransactionProduct } from "./TransactionProduct.model";
import { CartProduct } from "./CartProduct.model";

@Table({
    modelName: "Product",
    timestamps: true,
    paranoid: true,
    version: true,
})
export class Product extends Model {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: number;

    @ForeignKey(() => Merchant)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare merchantId: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
    })
    declare description: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare displayImage: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM("USED", "NEW"),
    })
    declare type: "USED" | "NEW";

    @Column({
        allowNull: false,
        type: DataType.DECIMAL(10, 2),
    })
    declare price: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    declare prevPrice: number;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    declare stock: number;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    declare isDeleted: boolean;

    @BelongsTo(() => Merchant, "merchantId")
    declare merchant: Merchant;

    @HasMany(() => ProductImage, "productId")
    declare images: ProductImage[];

    @HasMany(() => TransactionProduct, "productId")
    declare transactions: TransactionProduct[];

    @HasMany(() => CartProduct, "productId")
    declare carts: CartProduct[];
}
