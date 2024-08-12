import { IsDefined, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { ICustomerCreation } from "../../../db/models/Customer.model";

export class CustomerRegisterRequestDto implements ICustomerCreation{
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
}