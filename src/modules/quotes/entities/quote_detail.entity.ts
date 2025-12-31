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

  @Column({ type: 'varchar', length: 100, nullable: false })
  product_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  code: string;

  @Column({ type: 'int', width: 60, nullable: false, default: 1 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  unit_price: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discount_percentage: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discount_amount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Column({ type: 'int', width: 60, nullable: false, default: 1 })
  order: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  //RELATIONS

  @ManyToOne(() => Quote, { nullable: false, onDelete: 'CASCADE' })
  quote: Quote;
}
