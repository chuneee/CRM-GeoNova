import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ClientType } from '../enums/client-type.enum';

export class CreateClientDto {
  @IsEnum(ClientType)
  type: ClientType;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La razón social es obligatoria' })
  business_name: string;

  @IsString()
  @IsNotEmpty({ message: 'El RFC inicial es obligatorio' })
  @MaxLength(13, { message: 'El RFC inicial no puede exceder 13 caracteres' })
  rfc_init: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsPhoneNumber()
  @MaxLength(20, {
    message: 'El número de teléfono no puede exceder los 20 caracteres',
  })
  phone: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  web_site: string;

  @IsString()
  @IsNotEmpty({ message: 'La ciudad es obligatoria' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'El estado o provincia es obligatoria' })
  state_province: string;

  @IsString()
  @IsNotEmpty({ message: 'El código postal es obligatorio' })
  @MaxLength(10, { message: 'El código postal no puede exceder 10 caracteres' })
  zip_code: string;

  @IsString()
  @IsNotEmpty({ message: 'El país es obligatorio' })
  country: string;

  @IsString()
  @IsNotEmpty({ message: 'El giro o industria es obligatorio' })
  industry: string;

  @IsNumber()
  @IsOptional()
  company: number;

  @IsNumber()
  @IsOptional()
  assigned_to: number;
}
