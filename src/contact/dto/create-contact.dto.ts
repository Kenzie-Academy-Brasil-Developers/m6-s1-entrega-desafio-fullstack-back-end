import { IsEmail, IsOptional, IsString } from 'class-validator';
export class CreateContactDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
