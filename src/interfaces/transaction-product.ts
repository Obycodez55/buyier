import { IProduct } from "./product.interface";
import { ITransaction } from "./transaction.interface";

export interface ITransactionProduct {
    id: number;
    transactionId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    transaction?: ITransaction;
    product?: IProduct;
    createdAt: Date;
    updatedAt: Date;
}