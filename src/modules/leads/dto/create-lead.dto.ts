import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { LeadOrigin } from '../enums/lead-origin.enum';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  names: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  surnames: string;

  @IsEmail()
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email?: string;

  @IsPhoneNumber()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'El puesto o cargo es obligatorio' })
  position: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsEnum(LeadOrigin)
  @IsOptional()
  origin: LeadOrigin;

  @IsString()
  @IsOptional()
  notes: string;

  @IsNumber()
  @IsOptional()
  assigned_to: number;
}
