import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Merchant } from "./Merchant.model";
import { ProductImage } from "./ProductImage.model";
import { TransactionProduct } from "./TransactionProduct.model";
import { CartProduct } from "./CartProduct.model";
import { Optional } from "sequelize";

export interface IProduct {
    id: string;
    merchantId: string;
    name: string;
    description: string;
    displayImage: string;
    type: "USED" | "NEW";
    price: number;
    prevPrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface IProductCreation extends Optional<IProduct, "id" | "createdAt" | "updatedAt"> { }

@Table({
    modelName: "Product",
    timestamps: true,
    paranoid: true,
    version: true,
})
export class Product extends Model<IProduct, IProductCreation> {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: string;

    @ForeignKey(() => Merchant)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare merchantId: string;

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


    @BelongsTo(() => Merchant, "merchantId")
    declare merchant: Merchant;

    @HasMany(() => ProductImage, "productId")
    declare images: ProductImage[];

    @HasMany(() => TransactionProduct, "productId")
    declare transactions: TransactionProduct[];

    @HasMany(() => CartProduct, "productId")
    declare carts: CartProduct[];
}
