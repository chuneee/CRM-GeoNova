import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    const contact = await this.contactsService.findOne(+id);
    if (!contact) {
      throw new Error('Contact not found');
    }

    return this.contactsService.update(contact, updateContactDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const contact = await this.contactsService.findOne(+id);
    if (!contact) {
      throw new Error('Contact not found');
    }

    return this.contactsService.remove(contact);
  }
}
