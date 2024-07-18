import { ICustomer } from "./customer.interface";
import { IMerchant } from "./merchant.interface";

export interface IPhoneNumber {
    id: number;
    customerId: number;
    merchantId: number;
    number: string;
    isPrimary: boolean;
    customer?: ICustomer;
    merchant?: IMerchant;
    createdAt: Date;
    updatedAt: Date;
}