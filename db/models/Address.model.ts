import { Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";

// Import Related Models
import { Customer } from "./Customer.model";
import { Merchant } from "./Merchant.model";
import { DataTypes } from "sequelize";


@Table({
    modelName: "Address",
    validate: {
        eitherCustomerIdOrMerchantId(this: Address) {
            if ((this.customerId && this.merchantId) || (!this.customerId && !this.merchantId)) {
                throw new Error('Either customerId or merchantId must be provided, but not both.');
            }
        }
    },
    indexes: [
        {
            unique: false,
            fields: ["customerId", "merchantId"]
        }
    ],
    paranoid: true,
    timestamps: true,
    version: true,
})
export class Address extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Customer)
    @Column({
        type: DataTypes.INTEGER,
    })
    declare customerId: number;

    @ForeignKey(() => Merchant)
    @Column({
        type: DataTypes.INTEGER,
    })
    declare merchantId: number;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    declare address: string;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    declare city: string;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    declare state: string;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    declare country: string;

    @Column({
        allowNull: false,
        type: DataTypes.STRING,
    })
    declare postalCode: string;

    @BelongsTo(() => Customer)
    declare customer: Customer;

    @BelongsTo(() => Merchant)
    declare merchant: Merchant;
 }