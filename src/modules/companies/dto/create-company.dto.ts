import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { CompanySettingsDto } from './company-settings.dto';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la empresa es obligatorio' })
  brand_name: string;

  @IsString()
  @IsNotEmpty({ message: 'La razón social es obligatoria' })
  business_name: string;

  @IsString()
  @IsOptional()
  @MaxLength(13, { message: 'El RFC no puede exceder los 13 caracteres' })
  rfc_init: string;

  @IsEmail()
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @IsPhoneNumber()
  @MaxLength(20, {
    message: 'El número de teléfono no puede exceder los 20 caracteres',
  })
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  phone: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  state_province: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  @MaxLength(10, {
    message: 'El código postal no puede exceder los 10 caracteres',
  })
  zip_code: string;

  @IsString()
  @IsOptional()
  logo_url: string;

  @IsOptional()
  @Validate(() => CompanySettingsDto)
  settings: CompanySettingsDto;
}
