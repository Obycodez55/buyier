import { ICustomer } from "./customer.interface";
import { IMerchant } from "./merchant.interface";

export interface ICode {
    id: number;
    customerId?: number;
    merchantId?: number;
    type: 'EMAIL' | 'PASSWORD_RESET';
    code: string;
    expires: Date;
    customer?: ICustomer;
    merchant?: IMerchant;
    createdAt: Date;
    updatedAt: Date;
}