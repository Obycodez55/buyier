import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Merchant } from "./Merchant.model";

@Table({
    modelName: "MerchantVerification", 
    createdAt: "dateOfApplication"
})
export class MerchantVerification extends Model<MerchantVerification> {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    declare id: number;

    @ForeignKey(() => Merchant)
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    declare merchantId: number;

    @Column({
        allowNull: false,
        type: DataType.ENUM("BUSINESS_REGISTRATION", "IDENTITY_VERIFICATION"),
    })
    declare type: "BUSINESS_REGISTRATION" | "IDENTITY_VERIFICATION";

    @Column({
        allowNull: false,
        type: DataType.ENUM("NIN", "CAC", "UTILITY_BILL", "PASSPORT", "DRIVERS_LICENSE"),
    })
    declare scope: "NIN" | "CAC" | "UTILITY_BILL" | "PASSPORT" | "DRIVERS_LICENSE";

    @Column(DataType.STRING)
    declare document: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM("PENDING", "APPROVED", "REJECTED"),
        defaultValue: "PENDING",
    })
    declare status: "PENDING" | "APPROVED" | "REJECTED";

    @Column(DataType.DATE)
    declare dateOfApproval: Date;

    @BelongsTo(() => Merchant, { foreignKey: "merchantId", as: "merchant" })
    declare merchant: Merchant;
}
