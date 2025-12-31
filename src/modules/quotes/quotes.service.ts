import { Injectable } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { Between, Repository } from 'typeorm';
import { QuoteDetail } from './entities/quote_detail.entity';
import { CompaniesService } from '../companies/companies.service';
import { ClientsService } from '../clients/clients.service';
import { ContactsService } from '../contacts/contacts.service';
import { OpportunitiesService } from '../opportunities/opportunities.service';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,

    @InjectRepository(QuoteDetail)
    private quoteDetailsRepository: Repository<QuoteDetail>,

    private readonly companiesService: CompaniesService,
    private readonly clientsService: ClientsService,
    private readonly contactsService: ContactsService,
    private readonly opportunitiesService: OpportunitiesService,
  ) {}

  async create(createQuoteDto: CreateQuoteDto) {
    let company;
    let client;
    let contact;
    let opportunity;

    let details: QuoteDetail[] = [];

    if (createQuoteDto.company) {
      company = await this.companiesService.findOne(createQuoteDto.company);
    }

    if (createQuoteDto.client) {
      client = await this.clientsService.findOne(createQuoteDto.client);
    }

    if (createQuoteDto.contact) {
      contact = await this.contactsService.findOne(createQuoteDto.contact);
    }

    if (createQuoteDto.opportunity) {
      opportunity = await this.opportunitiesService.findOne(
        createQuoteDto.opportunity,
      );
    }

    const { quote_details, ...quoteData } = createQuoteDto;

    const subtotalAmount = quote_details.reduce(
      (sum, item) => sum + item.subtotal,
      0,
    );

    const total_amount =
      subtotalAmount - (createQuoteDto?.global_discount || 0);

    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

    const numberOfQuotes = await this.quotesRepository.count({
      where: { issue_date: Between(startOfYear, endOfYear) },
    });

    const generatedNumber = `COT-${new Date().getFullYear()}-${(numberOfQuotes + 1).toString().padStart(3, '0')}`;

    const newQuote = this.quotesRepository.create({
      ...quoteData,
      currency: quoteData.currency?.toString(),
      number: generatedNumber,
      issue_date: new Date(),
      subtotal_amount: subtotalAmount,
      total_amount: total_amount,
      company,
      client,
      contact,
      opportunity,
    });

    const savedQuote = await this.quotesRepository.save(newQuote);

    for (const [index, detail] of quote_details.entries()) {
      const quoteDetail = this.quoteDetailsRepository.create({
        ...detail,
        order: index + 1,
        quote: savedQuote,

        code: `DET-${savedQuote.id.toString().padStart(2, '0')}-${(index + 1).toString().padStart(2, '0')}`,
      });
      details.push(quoteDetail);
    }
    const savedDetail = await this.quoteDetailsRepository.save(details);

    return savedQuote;
  }

  findAll() {
    return this.quotesRepository.find();
  }

  findOne(id: number) {
    return this.quotesRepository.findOne({
      where: { id },
    });
  }
}
