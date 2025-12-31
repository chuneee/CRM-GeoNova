import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,

    private clientsService: ClientsService,
  ) {}

  async create(createContactDto: CreateContactDto) {
    let client = await this.clientsService.findOne(createContactDto.client);

    if (!client) {
      throw new Error('Client not found');
    }

    const nesContact = this.contactsRepository.create({
      ...createContactDto,
      client: client,
    });

    return this.contactsRepository.save(nesContact);
  }

  findAll() {
    return this.contactsRepository.find();
  }

  findOne(id: number) {
    return this.contactsRepository.findOneBy({ id });
  }

  async update(contact: Contact, updateContactDto: UpdateContactDto) {
    if (!updateContactDto.client) {
      throw new Error('Client ID is required');
    }

    let client = await this.clientsService.findOne(updateContactDto.client);

    if (!client) {
      throw new Error('Client not found');
    }

    Object.assign(contact, updateContactDto);
    contact.client = client;

    return this.contactsRepository.save(contact);
  }

  remove(contact: Contact) {
    return this.contactsRepository.remove(contact);
  }
}
