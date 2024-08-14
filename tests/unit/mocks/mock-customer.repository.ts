import { ICustomer } from "../../../db/models/Customer.model";
import { ICustomerRepository } from "../../../src/repositories/interfaces/customer.repository.interface";

export class MockCustomerRepository implements ICustomerRepository {
    private customers: ICustomer[];
    constructor() {
        this.customers = [
            {
                id: "09ec8b59-be22-49a5-8870-aa0efa6270df",
                firstName: "John",
                lastName: "Doe",
                email: "jonhdoe@gmail.com",
                password: "$2b$10$lf2YPWEI6eLEmtaqq5B8a.e.P/x6tDZ/rEnzxlrehuPDxKE3bK462",
                createdAt: new Date("2021-09-01T00:00:00.000Z"),
                updatedAt: new Date("2021-09-01T00:00:00.000Z"),
                emailVerifiedAt: new Date("2021-09-01T00:00:00.000Z"),
            },
        ]
    }

    getCustomerByEmail(email: string): Promise<ICustomer> {
        return new Promise((resolve, reject) => {
            try {
                const customer = this.customers.find((customer) => customer.email === email);
                // console.log(customer)
                resolve(customer as unknown as ICustomer);
            } catch (e) {
                reject(e);
            }
        });
    }

    getCustomerById(id: string): Promise<ICustomer> {
        return new Promise((resolve, reject) => {
            try {
                const customer = this.customers.find((customer) => customer.id === id);
                resolve(customer as unknown as ICustomer);
            } catch (e) {
                reject(e);
            }
        });
    }

    isVerified(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                const customer = this.customers.find((customer) => customer.id === id);
                resolve(!!customer?.emailVerifiedAt);
            } catch (e) {
                reject(e);
            }
            });
    }

    findAll(): Promise<ICustomer[]> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.customers);
            } catch (e) {
                reject(e);
            }
        });
    }

    save(t: ICustomer): Promise<ICustomer | undefined> {
        return Promise.resolve(undefined);
      }
    
      update(t: ICustomer, id: string): Promise<boolean | undefined> {
        return Promise.resolve(undefined);
      }

}