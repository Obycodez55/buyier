import { ICustomer } from "../../interfaces/customer.interface";

export interface ICustomerRepository {
    getCustomerById(id: number): Promise<ICustomer>;
    getCustomerByEmail(email: string): Promise<ICustomer>;
}