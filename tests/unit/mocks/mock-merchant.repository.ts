import { IMerchant } from "../../../db/models/Merchant.model";
import { IMerchantRepository } from "../../../src/repositories/interfaces/merchant.repository.interface";

export class MockMerchantRepository implements IMerchantRepository {
    private merchants: IMerchant[];
    constructor() {
        this.merchants = [
            {
                id: "09ec8b59-be22-49a5-8870-aa0efa6270df",
                firstName: "John",
                lastName: "Doe",
                email: "jonhdoe@gmail.com",
                password: "$2b$10$lf2YPWEI6eLEmtaqq5B8a.e.P/x6tDZ/rEnzxlrehuPDxKE3bK462",
                brandName: "John Doe's Store",
                type: "COMPANY",
                createdAt: new Date("2021-09-01T00:00:00.000Z"),
                updatedAt: new Date("2021-09-01T00:00:00.000Z"),
                emailVerifiedAt: new Date("2021-09-01T00:00:00.000Z"),
            }
        ]
    }

    getMerchantByEmail(email: string): Promise<IMerchant> {
        return new Promise((resolve, reject) => {
            try {
                const merchant = this.merchants.find((merchant) => merchant.email === email);
                resolve(merchant as unknown as IMerchant);
            } catch (e) {
                reject(e);
            }
        });
    }

    getMerchantById(id: string): Promise<IMerchant> {
        return new Promise((resolve, reject) => {
            try {
                const merchant = this.merchants.find((merchant) => merchant.id === id);
                resolve(merchant as unknown as IMerchant);
            } catch (e) {
                reject(e);
            }
        });
    }

    getMerchantByBrandName(brandName: string): Promise<IMerchant> {
        return new Promise((resolve, reject) => {
            try {
                const merchant = this.merchants.find((merchant) => merchant.brandName === brandName);
                resolve(merchant as unknown as IMerchant);
            } catch (e) {
                reject(e);
            }
        });
    }

    isVerified(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                const merchant = this.merchants.find((merchant) => merchant.id === id);
                resolve(!!merchant?.emailVerifiedAt);
            } catch (e) {
                reject(e);
            }
            });
    }

    findAll(): Promise<IMerchant[]> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.merchants);
            } catch (e) {
                reject(e);
            }
        });
    }

    save(t: IMerchant): Promise<IMerchant | undefined> {
        return Promise.resolve(undefined);
      }
    
      update(t: IMerchant, id: string): Promise<boolean | undefined> {
        return Promise.resolve(undefined);
      }
}