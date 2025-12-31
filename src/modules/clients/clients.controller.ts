import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @Auth()
  create(@Body() createClientDto: CreateClientDto, @AuthUser() authUser: User) {
    return this.clientsService.create(createClientDto, authUser);
  }

  @Get()
  async findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const client = await this.clientsService.findOne(+id);
    if (!client) {
      throw new Error('Cliente no encontrado');
    }

    return this.clientsService.update(client, updateClientDto);
  }

  @Delete(':id')
  async changeActiveStatus(@Param('id') id: string) {
    const client = await this.clientsService.findOne(+id);
    if (!client) {
      throw new Error('Cliente no encontrado');
    }

    return this.clientsService.changeActiveStatus(client);
  }
}
