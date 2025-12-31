import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';

export class CreateQuoteDetailsDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  product_name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  quantity: number;

  @IsNumber()
  @IsNotEmpty({ message: 'La cantidad es obligatoria' })
  unit_price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'El subtotal es obligatorio' })
  subtotal: number;

  @IsInt()
  @IsOptional()
  @Max(100, { message: 'El porcentaje de descuento no puede ser mayor a 100' })
  discount_percentage: number;
}
