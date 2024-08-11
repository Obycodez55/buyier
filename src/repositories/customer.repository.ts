import { Customer, ICustomer, ICustomerCreation } from "../../db/models/Customer.model";
import { ICustomerRepository } from "./interfaces/customer.repository.interface";


export class CustomerRepository implements ICustomerRepository {

    findAll(): Promise<ICustomer[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const customers = await Customer.findAll();
                resolve(
                    customers.map((customer) => customer as unknown as ICustomer)
                );
            } catch (error) {
                reject(error);
            }
        });
    }

    getCustomerById(id: string): Promise<ICustomer> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await Customer.findOne({
                    where: {
                        id
                    }
                });
                resolve(customer as unknown as ICustomer);
            } catch (error) {
                reject(error);
            }
        });
    }

    getCustomerByEmail(email: string): Promise<ICustomer> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await Customer.findOne({
                    where: {
                        email
                    }
                });
                resolve(customer as unknown as ICustomer);
            } catch (error) {
                reject(error);
            }
        });
    }

    update(updateData: Partial<ICustomer>, id: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await Customer.update({ ...updateData }, {
                    where: {
                        id
                    }
                });
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    save(customer: ICustomerCreation): Promise<ICustomer> {
        return new Promise(async (resolve, reject) => {
            try {
                const newCustomer = Customer.build(customer);
                await newCustomer.save();
                resolve(newCustomer as unknown as ICustomer);
            } catch (error) {
                reject(error);
            }
        });
    }

}