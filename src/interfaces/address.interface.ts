import { ICustomer } from "./customer.interface";
import { IMerchant } from "./merchant.interface";

export interface IAddress {
    id: number;
    customerId?: number;
    merchantId?: number;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    isDeleted: boolean;
    customer?: ICustomer;
    merchant?: IMerchant;
    createdAt: Date;
    updatedAt: Date;
}