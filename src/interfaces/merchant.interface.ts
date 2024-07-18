import { IAddress } from "./address.interface";
import { ICode } from "./code.interface";
import { IMerchantVerification } from "./merchant-verification.interface";
import { IPhoneNumber } from "./phone-number.interface";
import { IProduct } from "./product.interface";

export interface IMerchant {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    brandName: string;
    password: string;
    type: 'INDIVIDUAL' | 'COMPANY';
    emailVerified: boolean;
    isDeleted: boolean;
    products: IProduct[];
    codes: ICode[];
    addresses: IAddress[];
    phoneNumbers: IPhoneNumber[];
    verifications: IMerchantVerification[];
    createdAt: Date;
    updatedAt: Date;
}