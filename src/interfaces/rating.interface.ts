import { ICustomer } from "./customer.interface";
import { IProduct } from "./product.interface";

export interface IRating {
    id: number;
    productId: number;
    customerId: number;
    rating: number;
    review: string;
    customer?: ICustomer;
    product?: IProduct;
    createdAt: Date;
    updatedAt: Date;
}