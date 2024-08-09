import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Customer } from "./Customer.model";
import { Merchant } from "./Merchant.model";

@Table({ 
    modelName: "Code",
    timestamps: true,
    version: true,
    validate: {
        eitherCustomerIdOrMerchantId(this: Code) {
            if ((this.customerId && this.merchantId) || (!this.customerId && !this.merchantId)) {
                throw new Error('Either customerId or merchantId must be provided, but not both.');
            }
        }
    }
})
export class Code extends Model<Code> {
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
        type: DataType.ENUM('EMAIL', 'PASSWORD_RESET')
    })
    declare type: string;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
        validate: {
            len: [4, 6]
        },
    })
    declare code: number;

    @Column({
        allowNull: false,
        type: DataType.DATE,
        defaultValue: () => new Date(new Date().getTime() + 15 * 60 * 1000)
    })
    declare expires: Date;

    @BelongsTo(() => Customer, { foreignKey: "customerId", as: "customer" })
    declare customer: Customer;

    @BelongsTo(() => Merchant, { foreignKey: "merchantId", as: "merchant" })
    declare merchant: Merchant;
}
