import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del usuario es requerido' })
  names: string;

  @IsString()
  @IsNotEmpty({ message: 'Los apellidos del usuario son requeridos' })
  surnames: string;

  @IsEmail()
  @IsNotEmpty({ message: 'El correo electrónico del usuario es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El rol del usuario es requerido' })
  role: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña del usuario es requerida' })
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'La contraseña debe contener mayúsculas, minúsculas y números',
  })
  password: string;
}
