import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TypeCurrency } from 'src/common/enums/type-currency.enum';

export class CompanySettingsDto {
  @IsEnum(TypeCurrency)
  @IsOptional()
  type_currency: string;

  @IsString()
  @IsOptional()
  timezone: string;

  @IsString()
  @IsOptional()
  date_format: string;

  @IsString()
  @IsOptional()
  language: string;
}
