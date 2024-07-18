import { IProduct } from "./product.interface";

export interface IProductImage {
    id: number;
    productId: number;
    image: string;
    product?: IProduct;
    createdAt: Date;
    updatedAt: Date;
}