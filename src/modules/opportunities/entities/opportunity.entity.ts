import { Client } from 'src/modules/clients/entities/client.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Lead } from 'src/modules/leads/entities/lead.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('opportunities')
export class Opportunity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  estimated_value: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  stage: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  type_currency: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  currency: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'int', default: 1 })
  probability: number;

  @Column({ type: 'date', nullable: true })
  closing_date: Date;

  @Column({ type: 'date', nullable: true })
  estimated_closing_date: Date;

  @Column({ type: 'text', nullable: true })
  lost_reason: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  //   RELATIONS
  @ManyToOne(() => Client, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  client: Client;

  @ManyToOne(() => Company, {
    nullable: true,
    eager: true,
  })
  company: Company;

  @ManyToOne(() => Lead, {
    nullable: true,
    eager: true,
  })
  lead: Lead;

  @ManyToOne(() => User, {
    nullable: false,
    eager: true,
  })
  created_by: User;

  @ManyToOne(() => User, {
    nullable: true,
    eager: true,
  })
  assigned_to: User;
}
