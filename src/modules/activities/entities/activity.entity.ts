import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActivityType } from '../enums/activity-type.enum';
import { ActivityStatus } from '../enums/activity-status.enum';
import { ActivityPriority } from '../enums/activity-priority.enum';
import { Lead } from 'src/modules/leads/entities/lead.entity';
import { Client } from 'src/modules/clients/entities/client.entity';
import { Opportunity } from 'src/modules/opportunities/entities/opportunity.entity';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: ActivityType, nullable: false })
  type: ActivityType;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  date_time: Date;

  @Column({ type: 'int', width: 60, nullable: true })
  duration_minutes: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  location: string;

  @Column({
    type: 'enum',
    enum: ActivityStatus,
    default: ActivityStatus.PENDIENTE,
  })
  status: ActivityStatus;

  @Column({
    type: 'enum',
    enum: ActivityPriority,
    default: ActivityPriority.MEDIA,
  })
  priority: ActivityPriority;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @ManyToOne(() => Lead, {
    nullable: true,
    eager: true,
  })
  lead: Lead;

  @ManyToOne(() => Client, {
    nullable: true,
    eager: true,
  })
  client: Client;

  @ManyToOne(() => Opportunity, {
    nullable: true,
    eager: true,
  })
  opportunity: Opportunity;

  @ManyToOne(() => User, {
    nullable: true,
    eager: true,
  })
  assigned_to: User;

  @ManyToOne(() => User, {
    nullable: false,
    eager: true,
  })
  created_by: User;
}
