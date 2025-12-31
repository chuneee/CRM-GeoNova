import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('opportunities')
@Auth()
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Post()
  create(
    @Body() createOpportunityDto: CreateOpportunityDto,
    @AuthUser() authUser: User,
  ) {
    return this.opportunitiesService.create(createOpportunityDto, authUser);
  }

  @Get()
  findAll() {
    return this.opportunitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunitiesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOpportunityDto: UpdateOpportunityDto,
  ) {
    const opportunity = await this.opportunitiesService.findOne(+id);

    if (!opportunity) {
      throw new Error('Oportunidad no encontrada');
    }

    return this.opportunitiesService.update(opportunity, updateOpportunityDto);
  }
}
