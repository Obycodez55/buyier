import { ICustomer } from "./customer.interface";
import { IDelivery } from "./delivery.interface";

export interface ITransaction {
    id: number;
    customerId: number;
    deliveryId: number;
    deliveryFee: number;
    productsAmount: number;
    totalAmount: number;
    date: Date;
    customer?: ICustomer;
    delivery?: IDelivery;
}