import { ICustomer } from "./customer.interface";
import { IProduct } from "./product.interface";

export interface ICartProduct {
    id: number;
    customerId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    customer?: ICustomer;
    product?: IProduct;
    createdAt: Date;
    updatedAt: Date;
}