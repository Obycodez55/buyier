import { IMerchant } from "../../../db/models/Merchant.model";

export interface IMerchantRepository {
    getMerchantById(id: string): Promise<IMerchant>;
    getMerchantByEmail(email: string): Promise<IMerchant>;
    getMerchantByBrandName(brandName: string): Promise<IMerchant>;
    isVerified(id: string): Promise<boolean>;
}