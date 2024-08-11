import { ICustomer } from "../../../db/models/Customer.model";

export interface ICustomerRepository {
    getCustomerById(id: string): Promise<ICustomer>;
    getCustomerByEmail(email: string): Promise<ICustomer>;
}