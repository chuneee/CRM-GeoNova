import { Injectable } from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Opportunity } from './entities/opportunity.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ClientsService } from '../clients/clients.service';
import { CompaniesService } from '../companies/companies.service';
import { LeadsService } from '../leads/leads.service';

@Injectable()
export class OpportunitiesService {
  constructor(
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,

    private readonly usersService: UsersService,
    private readonly clientsService: ClientsService,
    private readonly companiesService: CompaniesService,
    private readonly leadsService: LeadsService,
  ) {}

  async create(createOpportunityDto: CreateOpportunityDto, authUser: User) {
    let assigned_to;
    let client;
    let company;
    let lead;

    if (createOpportunityDto.assigned_to) {
      assigned_to = await this.usersService.findOne(
        createOpportunityDto.assigned_to,
      );
    }

    if (createOpportunityDto.client) {
      client = await this.clientsService.findOne(createOpportunityDto.client);
    }

    if (createOpportunityDto.company) {
      company = await this.companiesService.findOne(
        createOpportunityDto.company,
      );
    }

    if (createOpportunityDto.lead) {
      lead = await this.leadsService.findOne(createOpportunityDto.lead);
    }

    const newOpportunity = this.opportunityRepository.create({
      ...createOpportunityDto,
      estimated_value: createOpportunityDto.estimated_value
        ? parseFloat(createOpportunityDto.estimated_value)
        : undefined,
      assigned_to,
      client,
      company,
      lead,
      created_by: authUser,
      code: '', // Temporary code, will be updated after saving
    });

    const savedOpportunity =
      await this.opportunityRepository.save(newOpportunity);

    const code = `OPP-${savedOpportunity.id.toString().padStart(2, '0')}-${Date.now()}`;

    savedOpportunity.code = code;
    return this.opportunityRepository.save(savedOpportunity);
  }

  findAll() {
    return this.opportunityRepository.find();
  }

  findOne(id: number) {
    return this.opportunityRepository.findOne({ where: { id } });
  }

  async update(
    oportunity: Opportunity,
    updateOpportunityDto: UpdateOpportunityDto,
  ) {
    let assigned_to;
    let client;
    let company;
    let lead;

    if (updateOpportunityDto.assigned_to) {
      assigned_to = await this.usersService.findOne(
        updateOpportunityDto.assigned_to,
      );
    }

    if (updateOpportunityDto.client) {
      client = await this.clientsService.findOne(updateOpportunityDto.client);
    }

    if (updateOpportunityDto.company) {
      company = await this.companiesService.findOne(
        updateOpportunityDto.company,
      );
    }

    if (updateOpportunityDto.lead) {
      lead = await this.leadsService.findOne(updateOpportunityDto.lead);
    }

    Object.assign(oportunity, updateOpportunityDto);

    if (assigned_to) {
      oportunity.assigned_to = assigned_to;
    }

    oportunity.client = client;
    oportunity.company = company;
    oportunity.lead = lead;
    
    if (updateOpportunityDto.estimated_value) {
      oportunity.estimated_value = parseFloat(
        updateOpportunityDto.estimated_value,
      );
    }

    return this.opportunityRepository.save(oportunity);
  }
}
