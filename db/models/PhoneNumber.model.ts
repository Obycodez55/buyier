import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Customer } from "./Customer.model";
import { Merchant } from "./Merchant.model";
import { Optional } from "sequelize";

export interface IPhoneNumber {
    id: string;
    customerId?: string;
    merchantId?: string;
    number: string;
    isPrimary: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface IPhoneNumberCreation extends Optional<IPhoneNumber, "id" | "isPrimary" | "createdAt"> { }
@Table({
    modelName: "PhoneNumber",
    timestamps: true,
    paranoid: true,
    version: true,
    validate: {
        eitherCustomerIdOrMerchantId(this: PhoneNumber) {
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
})
export class PhoneNumber extends Model<IPhoneNumber, IPhoneNumberCreation> {
    @Column({
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.UUID,
    })
    declare id: string;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.UUID,
    })
    declare customerId: string;

    @ForeignKey(() => Merchant)
    @Column({
        type: DataType.UUID,
    })
    declare merchantId: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare number: string;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    declare isPrimary: boolean;

    @BelongsTo(() => Customer, { foreignKey: "customerId", as: "customer" })
    declare customer: Customer;

    @BelongsTo(() => Merchant, { foreignKey: "merchantId", as: "merchant" })
    declare merchant: Merchant;
}

export default PhoneNumber;
