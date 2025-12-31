import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,

    private readonly userService: UsersService,
  ) {}

  async create(createLeadDto: CreateLeadDto, authUser: User) {
    let assigned_to;

    if (createLeadDto.assigned_to) {
      assigned_to = await this.userService.findOne(createLeadDto.assigned_to);
    }

    const newLead = this.leadRepository.create({
      ...createLeadDto,
      created_by: authUser,
      assigned_to: assigned_to,
    });
    return this.leadRepository.save(newLead);
  }

  findAll() {
    return this.leadRepository.find();
  }

  findOne(id: number) {
    return this.leadRepository.findOneBy({ id });
  }

  async update(lead: Lead, updateLeadDto: UpdateLeadDto) {
    let assigned_to;

    if (updateLeadDto.assigned_to) {
      assigned_to = await this.userService.findOne(updateLeadDto.assigned_to);
    }

    Object.assign(lead, updateLeadDto);

    if (assigned_to) {
      lead.assigned_to = assigned_to;
    }

    return this.leadRepository.save(lead);
  }

  remove(lead: Lead) {
    return this.leadRepository.delete(lead.id);
  }
}
