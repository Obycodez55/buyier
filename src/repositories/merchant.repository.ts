import { Merchant, IMerchant, IMerchantCreation } from "../../db/models/Merchant.model";
import { IMerchantRepository } from "./interfaces/merchant.repository.interface";


export class MerchantRepository implements IMerchantRepository {

    findAll(): Promise<IMerchant[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const customers = await Merchant.findAll();
                resolve(
                    customers.map((customer) => customer as unknown as IMerchant)
                );
            } catch (e) {
                reject(e);
            }
        });
    }

    getMerchantById(id: string): Promise<IMerchant> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await Merchant.findOne({
                    where: {
                        id
                    }
                });
                resolve(customer as unknown as IMerchant);
            } catch (e) {
                reject(e);
            }
        });
    }

    getMerchantByEmail(email: string): Promise<IMerchant> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await Merchant.findOne({
                    where: {
                        email
                    }
                });
                resolve(customer as unknown as IMerchant);
            } catch (e) {
                reject(e);
            }
        });
    }

    getMerchantByBrandName(brandName: string): Promise<IMerchant> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await Merchant.findOne({
                    where: {
                        brandName
                    }
                });
                resolve(customer as unknown as IMerchant);
            } catch (e) {
                reject(e);
            }
        });
    }

    isVerified(id: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const customer = await this.getMerchantById(id);
                resolve(!!customer.emailVerifiedAt)
            } catch (e) {
                reject(e);
            }
        })
    }

    update(updateData: Partial<IMerchant>, id: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await Merchant.update({ ...updateData }, {
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

    save(customer: IMerchantCreation): Promise<IMerchant> {
        return new Promise(async (resolve, reject) => {
            try {
                const newMerchant = Merchant.build(customer);
                await newMerchant.save();
                resolve(newMerchant as unknown as IMerchant);
            } catch (e) {
                reject(e);
            }
        });
    }

}