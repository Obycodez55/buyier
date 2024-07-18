import { ICartProduct } from "./cart-product.interface";
import { IMerchant } from "./merchant.interface";
import { IProductImage } from "./product-images.interaface";
import { ITransactionProduct } from "./transaction-product";

export interface IProduct {
    id: number;
    merchantId: number;
    name: string;
    description: string;
    displayImage: string;
    type: "USED" | "NEW";
    price: number;
    prevPrice?: number;
    stock: number;
    isDeleted: boolean;
    merchant?: IMerchant;
    images?: IProductImage[];
    transactions?: ITransactionProduct[];
    carts?: ICartProduct[];
    createdAt: Date;
    updatedAt: Date;
}