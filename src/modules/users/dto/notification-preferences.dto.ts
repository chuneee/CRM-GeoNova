import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class NotificationPreferencesDto {
  @IsBoolean()
  @IsOptional()
  email_unread_assigned: boolean;

  @IsBoolean()
  @IsOptional()
  email_opportunity_changes: boolean;

  @IsBoolean()
  @IsOptional()
  email_quotes_approved: boolean;

  @IsBoolean()
  @IsOptional()
  email_support_tickets: boolean;

  @IsBoolean()
  @IsOptional()
  push_team_messages: boolean;

  @IsBoolean()
  @IsOptional()
  push_overdue_tasks: boolean;

  @IsBoolean()
  @IsOptional()
  push_scheduled_activities: boolean;

  @IsInt()
  @IsOptional()
  reminder_meetings_minutes: number;

  @IsInt()
  @IsOptional()
  reminder_tasks_days: number;

  @IsBoolean()
  @IsOptional()
  dnd_enabled: boolean;

  @IsString()
  @IsOptional()
  dnd_start_time: string;

  @IsString()
  @IsOptional()
  dnd_end_time: string;
}
