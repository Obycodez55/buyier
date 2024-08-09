import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";

// Import Related Models
import { Customer } from "./Customer.model";
import { Merchant } from "./Merchant.model";


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
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: number;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.UUID,
    })
    declare customerId: number;

    @ForeignKey(() => Merchant)
    @Column({
        type: DataType.UUID,
    })
    declare merchantId: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare address: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare city: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare state: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare country: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare postalCode: string;

    @BelongsTo(() => Customer)
    declare customer: Customer;

    @BelongsTo(() => Merchant)
    declare merchant: Merchant;
 }