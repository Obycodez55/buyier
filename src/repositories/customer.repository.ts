import { Customer } from "../../db/models/Customer.model";
import { ICustomer } from "../interfaces/customer.interface";
import { ICustomerRepository } from "./interfaces/customer.repository.interface";


export class CustomerRepository implements ICustomerRepository {

    findAll(): Promise<ICustomer[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const customers = await Customer.findAll({
                    where: {
                        isDeleted: false
                    }
                });
                resolve(
                    customers.map((customer) => customer as unknown as ICustomer)
                );
            } catch (error) {
                reject(error);
            }
        });
    }

    getCustomerById(id: number): Promise<ICustomer> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await Customer.findOne({
                    where: {
                        id,
                        isDeleted: false
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
                        email,
                        isDeleted: false
                    }
                });
                resolve(customer as unknown as ICustomer);
            } catch (error) {
                reject(error);
            }
        });
    }

    update(updateData: ICustomer, id: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await Customer.update({ ...updateData }, {
                    where: {
                        id,
                        isDeleted: false
                    }
                });
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    save(customer: ICustomer): Promise<ICustomer> {
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