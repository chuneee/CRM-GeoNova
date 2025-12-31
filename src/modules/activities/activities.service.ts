import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { LeadsService } from '../leads/leads.service';
import { UsersService } from '../users/users.service';
import { OpportunitiesService } from '../opportunities/opportunities.service';
import { ClientsService } from '../clients/clients.service';
import { User } from '../users/entities/user.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Client } from '../clients/entities/client.entity';
import { Opportunity } from '../opportunities/entities/opportunity.entity';
import { ActivityStatus } from './enums/activity-status.enum';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,

    private readonly leadsService: LeadsService,
    private readonly usersService: UsersService,
    private readonly opportunitiesService: OpportunitiesService,
    private readonly clientsService: ClientsService,
  ) {}

  async create(createActivityDto: CreateActivityDto, authUser: User) {
    let lead: Lead | null = null;
    let client: Client | null = null;
    let opportunity: Opportunity | null = null;
    let assigned_to: User | null = null;

    if (createActivityDto.lead) {
      lead = await this.leadsService.findOne(createActivityDto.lead);
    }

    if (createActivityDto.opportunity) {
      opportunity = await this.opportunitiesService.findOne(
        createActivityDto.opportunity,
      );
    }

    if (createActivityDto.client) {
      client = await this.clientsService.findOne(createActivityDto.client);
    }

    if (createActivityDto.assigned_to) {
      assigned_to = await this.usersService.findOne(
        createActivityDto.assigned_to,
      );
    }

    const activity = this.activityRepository.create({
      ...createActivityDto,
      lead: lead || undefined,
      client: client || undefined,
      opportunity: opportunity || undefined,
      assigned_to: assigned_to || undefined,
      created_by: authUser,
    });
    return this.activityRepository.save(activity);
  }

  findAll() {
    return this.activityRepository.find({
      relations: ['lead', 'client', 'opportunity', 'assigned_to', 'created_by'],
    });
  }

  findOne(id: number) {
    return this.activityRepository.findOne({
      where: { id },
      relations: ['lead', 'client', 'opportunity', 'assigned_to', 'created_by'],
    });
  }

  async update(activity: Activity, updateActivityDto: UpdateActivityDto) {
    let lead;
    let client;
    let opportunity;
    let assigned_to;

    if (updateActivityDto.lead) {
      lead = await this.leadsService.findOne(updateActivityDto.lead);
    }

    if (updateActivityDto.opportunity) {
      opportunity = await this.opportunitiesService.findOne(
        updateActivityDto.opportunity,
      );
    }

    if (updateActivityDto.client) {
      client = await this.clientsService.findOne(updateActivityDto.client);
    }

    if (updateActivityDto.assigned_to) {
      assigned_to = await this.usersService.findOne(
        updateActivityDto.assigned_to,
      );
    }

    Object.assign(activity, updateActivityDto);

    activity.lead = lead || undefined;
    activity.client = client || undefined;
    activity.opportunity = opportunity || undefined;
    activity.assigned_to = assigned_to || undefined;

    return this.activityRepository.save(activity);
  }

  remove(activity: Activity) {
    const activeStatus = activity.active;
    activity.active = !activeStatus;
    if (activity.active === false) {
      activity.status = ActivityStatus.CANCELADO;
    }
    return this.activityRepository.save(activity);
  }
}
