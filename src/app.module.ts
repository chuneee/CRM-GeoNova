import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { ClientsModule } from './modules/clients/clients.module';
import { LeadsModule } from './modules/leads/leads.module';
import { OpportunitiesModule } from './modules/opportunities/opportunities.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import Joi from 'joi';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USER: Joi.string().required(),
        // DATABASE_PASSWORD: Joi.string().required(),
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        extra: {
          charset: 'utf8mb4_general_ci',
          timezone: 'Z',
        },
      }),
      inject: [ConfigService],
    }),

    UsersModule,

    CompaniesModule,

    ClientsModule,

    LeadsModule,

    OpportunitiesModule,

    ContactsModule,

    ActivitiesModule,

    QuotesModule,
  ],
})
export class AppModule {}
