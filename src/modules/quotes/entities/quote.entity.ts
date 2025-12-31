import { Client } from 'src/modules/clients/entities/client.entity';
import { Company } from 'src/modules/companies/entities/company.entity';
import { Contact } from 'src/modules/contacts/entities/contact.entity';
import { Opportunity } from 'src/modules/opportunities/entities/opportunity.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuoteStatus } from '../enums/quote-status.enum';
import { TypeCurrency } from 'src/common/enums/type-currency.enum';
import { QuoteDetail } from './quote_detail.entity';

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  number: string;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({ type: 'date', nullable: false })
  issue_date: Date;

  @Column({ type: 'date', nullable: false })
  expiration_date: Date;

  @Column({ type: 'int', default: 1 })
  days_validity: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'enum', enum: QuoteStatus, default: QuoteStatus.BORRADOR })
  status: QuoteStatus;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  subtotal_amount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  global_discount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total_amount: number;

  @Column({ type: 'enum', enum: TypeCurrency, default: TypeCurrency.MXN })
  type_currency: TypeCurrency;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
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

  @ManyToOne(() => Client, { nullable: true, eager: true })
  client: Client;

  @ManyToOne(() => Opportunity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  opportunity: Opportunity;

  @ManyToOne(() => Contact, { nullable: true, eager: true })
  contact: Contact;

  @OneToMany(() => QuoteDetail, (quoteDetail) => quoteDetail.quote, {
    cascade: true,
    eager: true,
  })
  quote_details: QuoteDetail[];
}
