import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('leads')
@Auth()
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() createLeadDto: CreateLeadDto, @AuthUser() authUser: User) {
    return this.leadsService.create(createLeadDto, authUser);
  }

  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    const lead = await this.leadsService.findOne(+id);

    if (!lead) {
      throw new Error('Lead no encontrado');
    }

    return this.leadsService.update(lead, updateLeadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const lead = await this.leadsService.findOne(+id);

    if (!lead) {
      throw new Error('Lead no encontrado');
    }
    return this.leadsService.remove(lead);
  }
}
