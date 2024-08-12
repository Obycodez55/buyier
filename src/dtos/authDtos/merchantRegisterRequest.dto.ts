import { IsDefined, IsEmail, IsIn, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { IMerchantCreation } from "../../../db/models/Merchant.model";

export class MerchantRegisterRequestDto implements IMerchantCreation {
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    declare email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    declare password: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    declare firstName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    declare lastName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    declare brandName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(['INDIVIDUAL', 'COMPANY'])
    declare type: "INDIVIDUAL" | "COMPANY";
}