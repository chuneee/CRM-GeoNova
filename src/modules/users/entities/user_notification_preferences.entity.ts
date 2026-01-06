import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_notification_preferences' })
export class UserNotificationPreferences {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'boolean', default: true })
  email_unread_assigned: boolean;

  @Column({ type: 'boolean', default: true })
  email_opportunity_changes: boolean;

  @Column({ type: 'boolean', default: true })
  email_quotes_approved: boolean;

  @Column({ type: 'boolean', default: true })
  email_support_tickets: boolean;

  @Column({ type: 'boolean', default: true })
  push_team_messages: boolean;

  @Column({ type: 'boolean', default: true })
  push_overdue_tasks: boolean;

  @Column({ type: 'boolean', default: true })
  push_scheduled_activities: boolean;

  @Column({ type: 'int', default: 15 })
  reminder_meetings_minutes: number;

  @Column({ type: 'int', default: 1 })
  reminder_tasks_days: number;

  @Column({ type: 'boolean', default: false })
  dnd_enabled: boolean;

  @Column({ type: 'time', nullable: true })
  dnd_start_time: string;

  @Column({ type: 'time', nullable: true })
  dnd_end_time: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  //RELATIONS
  @OneToOne(() => User, (u) => u.notification_preferences, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
