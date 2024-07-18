import { IAddress } from "./address.interface";
import { ICartProduct } from "./cart-product.interface";
import { IDelivery } from "./delivery.interface";
import { IPhoneNumber } from "./phone-number.interface";
import { IRating } from "./rating.interface";
import { ITransaction } from "./transaction.interface";

export interface ICustomer {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    dateOfBirth?: Date;
    emailVerified: boolean;
    isDeleted: boolean;
    addresses?: IAddress[];
    cart: ICartProduct[];
    phoneNumbers: IPhoneNumber[];
    deliveries: IDelivery[];
    transactions: ITransaction[];
    ratings: IRating[];
    createdAt: Date;
    updatedAt: Date;
}