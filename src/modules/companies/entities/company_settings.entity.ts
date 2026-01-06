import { TypeCurrency } from 'src/common/enums/type-currency.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';

@Entity('company_settings')
export class CompanySettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TypeCurrency, default: 'MXN' })
  type_currency: TypeCurrency;

  @Column({ type: 'varchar', length: 100 })
  timezone: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  date_format: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  language: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @OneToOne(() => Company, (company) => company.settings, { nullable: false })
  @JoinColumn()
  company: Company;
}
