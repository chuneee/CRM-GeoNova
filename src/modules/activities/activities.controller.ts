import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('activities')
@Auth()
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto, @AuthUser() user: User) {
    return this.activitiesService.create(createActivityDto, user);
  }

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    const activity = await this.activitiesService.findOne(+id);

    if (!activity) {
      throw new Error('Activity not found');
    }

    return this.activitiesService.update(activity, updateActivityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const activity = await this.activitiesService.findOne(+id);

    if (!activity) {
      throw new Error('Activity not found');
    }

    return this.activitiesService.remove(activity);
  }
}
