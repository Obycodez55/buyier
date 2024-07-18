import { IMerchant } from './merchant.interface';

export interface IMerchantVerification {
    id: number;
    merchantId: number;
    type: 'BUSINESS_REGISTRATION' | 'IDENTITY_VERIFICATION';
    scope: 'NIN' | 'CAC' | 'UTILITY_BILL' | 'PASSPORT' | 'DRIVERS_LICENSE';
    document?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    merchant?: IMerchant;
    dateOfApproval: Date;
    dateOfApplication: Date;
}