import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ActivityType } from '../enums/activity-type.enum';
import { Type } from 'class-transformer';
import { ActivityStatus } from '../enums/activity-status.enum';
import { ActivityPriority } from '../enums/activity-priority.enum';

export class CreateActivityDto {
  @IsEnum(ActivityType)
  @IsNotEmpty({ message: 'El tipo de actividad es obligatorio' })
  type: ActivityType;

  @IsString()
  @IsNotEmpty({ message: 'El título de la actividad es obligatorio' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsNotEmpty({ message: 'La fecha y hora de la actividad es obligatoria' })
  @Type(() => Date)
  date_time: Date;

  @IsNumber()
  @IsOptional()
  duration_minutes?: number;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(ActivityStatus)
  @IsNotEmpty({ message: 'El estado de la actividad es obligatorio' })
  status: ActivityStatus;

  @IsEnum(ActivityPriority)
  @IsNotEmpty({ message: 'La prioridad de la actividad es obligatoria' })
  priority: ActivityPriority;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsInt()
  @IsOptional()
  lead?: number;

  @IsInt()
  @IsOptional()
  client?: number;

  @IsInt()
  @IsOptional()
  opportunity?: number;

  @IsInt()
  @IsOptional()
  assigned_to?: number;
}
