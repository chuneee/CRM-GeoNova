import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { QuoteStatus } from '../enums/quote-status.enum';
import { TypeCurrency } from 'src/common/enums/type-currency.enum';
import { CreateQuoteDetailsDto } from './create-quote-details.dto';

export class CreateQuoteDto {
  @IsDate()
  @IsNotEmpty({ message: 'La fecha de emisión es obligatoria' })
  @Type(() => Date)
  expiration_date: Date;

  @IsEnum(QuoteStatus)
  @IsNotEmpty({ message: 'El estado de la cotización es obligatorio' })
  status: QuoteStatus;

  @IsNumber()
  @IsOptional()
  global_discount: number;

  @IsEnum(TypeCurrency)
  @IsNotEmpty({ message: 'El tipo de moneda es obligatorio' })
  type_currency: TypeCurrency;

  @IsNumber()
  @IsOptional()
  currency: number;

  @IsString()
  @IsOptional()
  terms_payment: string;

  @IsString()
  @IsOptional()
  terms_conditions: string;

  @IsString()
  @IsOptional()
  notes: string;

  @IsArray()
  @IsNotEmpty({ message: 'Los detalles de la cotización son obligatorios' })
  @ArrayMinSize(1, {
    message: 'Debe agregar al menos un detalle a la cotización',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateQuoteDetailsDto)
  quote_details: CreateQuoteDetailsDto[];

  @IsInt()
  @IsOptional()
  company: number;

  @IsInt()
  @IsOptional()
  client: number;

  @IsInt()
  @IsOptional()
  opportunity: number;

  @IsInt()
  @IsOptional()
  contact: number;
}
