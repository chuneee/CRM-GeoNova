import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotificationPreferencesDto } from './dto/notification-preferences.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from './entities/user.entity';

@Auth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('notification-preferences')
  async findNotificationPreferences(@AuthUser() authUser: User) {
    const notificationPreferences =
      await this.usersService.findNotificationPreferences(authUser);

    return notificationPreferences;
  }

  @Patch('notification-preferences')
  async updateNotificationsPreferences(
    @AuthUser() authUser: User,
    @Body() notificationPreferencesDto: NotificationPreferencesDto,
  ) {
    const user = await this.usersService.findOne(authUser.id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.usersService.updateNotificationsPreferences(
      user,
      notificationPreferencesDto,
    );
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.usersService.update(user, updateUserDto);
  }

  @Delete(':id')
  async ChangeActiveUserState(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.usersService.ChangeActiveUserState(user);
  }
}
