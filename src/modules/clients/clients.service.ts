import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import { User } from '../users/entities/user.entity';
import { CompaniesService } from '../companies/companies.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,

    private companiesService: CompaniesService,
    private usersService: UsersService,
  ) {}

  async create(createClientDto: CreateClientDto, authUser: User) {
    let company: Company | null = null;
    let assigned_to: User | null = null;

    if (createClientDto.company) {
      company = await this.companiesService.findOne(createClientDto.company);

      if (!company) {
        throw new Error('Empresa no encontrada');
      }
    }

    if (createClientDto.assigned_to) {
      assigned_to = await this.usersService.findOne(
        createClientDto.assigned_to,
      );

      if (!assigned_to) {
        throw new Error('Usuario asignado no encontrado');
      }
    }

    const newClient = this.clientsRepository.create({
      ...createClientDto,
      company: company || undefined,
      assigned_to: assigned_to || undefined,
      created_by: authUser,
    });
    await this.clientsRepository.save(newClient);
    return newClient;
  }

  async findAll() {
    const clients = await this.clientsRepository.find({
      relations: ['company', 'assigned_to', 'created_by'],
    });
    return clients;
  }

  async findOne(id: number) {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['company', 'assigned_to', 'created_by'],
    });
    return client;
  }

  async update(client: Client, updateClientDto: UpdateClientDto) {
    let company;
    let assigned_to;

    if (updateClientDto.company) {
      company = await this.companiesService.findOne(updateClientDto.company);

      if (!company) {
        throw new Error('Empresa no encontrada');
      }
    }

    if (updateClientDto.assigned_to) {
      assigned_to = await this.usersService.findOne(
        updateClientDto.assigned_to,
      );

      if (!assigned_to) {
        throw new Error('Usuario asignado no encontrado');
      }
    }

    Object.assign(client, updateClientDto);

    client.company = company || null;
    client.assigned_to = assigned_to || null;

    return this.clientsRepository.save(client);
  }

  async changeActiveStatus(client: Client) {
    const activeStatus = client.active;

    client.active = !activeStatus;
    return this.clientsRepository.save(client);
  }
}
