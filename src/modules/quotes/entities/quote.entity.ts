import { Client } from 'src/modules/clients/entities/client.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Contact } from 'src/modules/contacts/entities/contact.entity';
import { Opportunity } from 'src/modules/opportunities/entities/opportunity.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  number: string;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({ type: 'date', nullable: true })
  issue_date: Date;

  @Column({ type: 'date', nullable: true })
  expiration_date: Date;

  @Column({ type: 'int', default: 1 })
  days_validity: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  subtotal_amount: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  global_discount: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  total_amount: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  type_currency: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  currency: string;

  @Column({ type: 'text', nullable: true })
  terms_payment: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  terms_conditions: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  //RELATIONS

  @ManyToOne(() => Company, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  company: Company;

  @ManyToOne(() => Client, { nullable: false, eager: true })
  client: Client;

  @ManyToOne(() => Opportunity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  opportunity: Opportunity;

  @ManyToOne(() => Contact, { nullable: false, eager: true })
  contact: Contact;
}
