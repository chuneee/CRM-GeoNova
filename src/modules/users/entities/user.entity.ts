import { Company } from 'src/modules/companies/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserNotificationPreferences } from './user_notification_preferences.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  names: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  surnames: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 250, nullable: false, unique: true })
  password: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_access: Date;

  @Column({ type: 'varchar', length: 15, nullable: true })
  role: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  profile_image_url: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  //RELATIONS
  @ManyToOne(() => Company, { nullable: true })
  company: Company;

  @OneToOne(() => UserNotificationPreferences, (unp) => unp.user, {
    cascade: true,
    nullable: true,
  })
  notification_preferences: UserNotificationPreferences;
}
