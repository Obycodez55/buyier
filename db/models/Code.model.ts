import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Customer } from "./Customer.model";
import { Merchant } from "./Merchant.model";
import { Optional } from "sequelize";

export interface ICode {
    id: string;
    customerId?: string;
    merchantId?: string;
    type: string;
    code: number;
    expires: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface CodeCreationAttributes extends Optional<ICode, "id" | "expires" | "createdAt" | "updatedAt"> {}
@Table({ 
    modelName: "Code",
    timestamps: true,
    validate: {
        eitherCustomerIdOrMerchantId(this: Code) {
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
export class Code extends Model<ICode, CodeCreationAttributes> {
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
        type: DataType.ENUM('EMAIL', 'PASSWORD_RESET')
    })
    declare type: string;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
        defaultValue: 6,
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
