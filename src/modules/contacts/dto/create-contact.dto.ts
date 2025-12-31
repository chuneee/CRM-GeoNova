import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'El campo nombres es obligatorio' })
  names: string;

  @IsString()
  @IsNotEmpty({ message: 'El campo apellidos es obligatorio' })
  surnames: string;

  @IsEmail()
  @IsNotEmpty({ message: 'El campo correo electrónico es obligatorio' })
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty({ message: 'El campo teléfono es obligatorio' })
  @MaxLength(20, {
    message: 'El campo teléfono no puede exceder los 20 caracteres',
  })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'El campo posición es obligatorio' })
  position: string;

  @IsString()
  @IsOptional()
  notes: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  is_principal: boolean;

  @IsNumber()
  @IsNotEmpty({ message: 'El campo cliente es obligatorio' })
  client: number;
}
