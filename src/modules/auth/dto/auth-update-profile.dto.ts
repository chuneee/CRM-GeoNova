import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class AuthUpdateProfileDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del usuario es requerido' })
  names: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido del usuario es requerido' })
  surnames: string;

  @IsString()
  email?: string;

  @IsPhoneNumber('MX', { message: 'El número de teléfono no es válido' })
  @MaxLength(20, {
    message: 'El número de teléfono no puede exceder los 20 caracteres',
  })
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty({ message: 'El rol del usuario es requerido' })
  role: string;
}
