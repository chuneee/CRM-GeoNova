import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { ClientsModule } from '../clients/clients.module';
import { LeadsModule } from '../leads/leads.module';
import { UsersModule } from '../users/users.module';
import { OpportunitiesModule } from '../opportunities/opportunities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    ClientsModule,
    LeadsModule,
    UsersModule,
    OpportunitiesModule,
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
})
export class ActivitiesModule {}
