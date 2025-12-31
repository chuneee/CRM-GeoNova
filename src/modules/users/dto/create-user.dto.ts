import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del usuario es requerido' })
  names: string;

  @IsString()
  @IsNotEmpty({ message: 'Los apellidos del usuario son requeridos' })
  surnames: string;

  @IsEmail()
  @IsNotEmpty({ message: 'El correo electrónico del usuario es requerido' })
  email: string;
}
