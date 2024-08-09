import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Customer } from "./Customer.model";
import { Merchant } from "./Merchant.model";


@Table({ 
    modelName: "PhoneNumber",
    validate: {
        eitherCustomerIdOrMerchantId(this: PhoneNumber) {
            if ((this.customerId && this.merchantId) || (!this.customerId && !this.merchantId)) {
                throw new Error('Either customerId or merchantId must be provided, but not both.');
            }
        }
    }
})
export class PhoneNumber extends Model<PhoneNumber> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Customer)
    @Column({
        type: DataType.INTEGER,
    })
    declare customerId: number;

    @ForeignKey(() => Merchant)
    @Column({
        type: DataType.INTEGER,
    })
    declare merchantId: number;

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
