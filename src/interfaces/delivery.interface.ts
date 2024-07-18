import { ICustomer } from "./customer.interface";
import { ITransaction } from "./transaction.interface";

export interface IDelivery {
    id: number;
    customerId: number;
    transactionId: number;
    type: 'HOME' | 'PICKUP';
    deliveryFee: number;
    status: 'PENDING' | 'DELIVERED';
    date: Date;
    customer?: ICustomer;
    transaction?: ITransaction;
}