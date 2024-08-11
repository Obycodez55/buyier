
export enum UserEnum{
    MERCHANT = "MERCHANT",
    CUSTOMER = "CUSTOMER"
}

export enum TypeEnum{
    PASSWORD = "PASSWORD_RESET",
    EMAIL = "EMAIL"
}

export interface ICodeRepository {
    newCode({scope, type, id}: {scope: UserEnum, type:TypeEnum, id: string }): Promise<{hash: string, code: number}>;
    validate(hash: string, code: number): Promise<boolean>;
}