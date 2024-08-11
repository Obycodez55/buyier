import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Merchant } from "./Merchant.model";
import { Optional } from "sequelize";

export interface IMerchantVerification {
    id: string;
    merchantId: string;
    type: "BUSINESS_REGISTRATION" | "IDENTITY_VERIFICATION";
    scope: "NIN" | "CAC" | "UTILITY_BILL" | "PASSPORT" | "DRIVERS_LICENSE";
    document: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    dateOfApproval: Date;
    deletedAt?: Date;
}

export interface IMerchantVerificationCreation extends Optional<IMerchantVerification, "id" | "dateOfApproval" | "status"> { }

@Table({
    modelName: "MerchantVerification", 
    createdAt: "dateOfApplication",
    paranoid: true,
    version: true,
})
export class MerchantVerification extends Model{
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
