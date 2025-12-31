import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { QuoteDetail } from './entities/quote_detail.entity';
import { ClientsModule } from '../clients/clients.module';
import { CompaniesModule } from '../companies/companies.module';
import { ContactsModule } from '../contacts/contacts.module';
import { OpportunitiesModule } from '../opportunities/opportunities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quote, QuoteDetail]),
    ClientsModule,
    CompaniesModule,
    ContactsModule,
    OpportunitiesModule,
  ],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
