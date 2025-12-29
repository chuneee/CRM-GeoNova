import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quote } from './quote.entity';

@Entity('quote_details')
export class QuoteDetail {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  product_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  code: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'int', width: 60, nullable: true })
  quantity: number;

  @Column({ type: 'int', width: 60, nullable: true })
  unity: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  unit_price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  discount_percentage: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  discount_amount: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  subtotal: number;

  @Column({ type: 'int', width: 60, nullable: true })
  order: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  //RELATIONS

  @ManyToOne(() => Quote, { nullable: false, onDelete: 'CASCADE' })
  quote: Quote;
}
