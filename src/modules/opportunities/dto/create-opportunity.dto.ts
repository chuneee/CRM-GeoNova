import {
  IsDate,
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OportunityStage } from '../enums/oportunity-stage.enum';
import { TypeCurrency } from 'src/common/enums/type-currency.enum';
import { Type } from 'class-transformer';

export class CreateOpportunityDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal(
    { decimal_digits: '0,2' },
    {
      message:
        'El valor estimado debe ser un número decimal con hasta 2 decimales',
    },
  )
  @IsNotEmpty({ message: 'El valor estimado es obligatorio' })
  estimated_value?: string;

  @IsEnum(OportunityStage)
  @IsNotEmpty({ message: 'La etapa es obligatoria' })
  stage: OportunityStage;

  @IsEnum(TypeCurrency)
  @IsNotEmpty({ message: 'El tipo de moneda es obligatorio' })
  type_currency: TypeCurrency;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  probability?: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'La fecha estimada de cierre es obligatoria' })
  estimated_closing_date: Date;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty({ message: 'El asignado es obligatorio' })
  assigned_to: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  client: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  company: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  lead: number;
}
