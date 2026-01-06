import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotificationPreferencesDto } from './dto/notification-preferences.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();

    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['notification_preferences'],
    });

    return user;
  }

  update(UserData: User, updateUserDto: UpdateUserDto) {
    Object.assign(UserData, updateUserDto);

    const updatedUser = this.usersRepository.save(UserData);

    return updatedUser;
  }

  async ChangeActiveUserState(user: User) {
    const userActiveState = user.active;

    user.active = !userActiveState;

    await this.usersRepository.save(user);

    return user;
  }

  async updateNotificationsPreferences(
    user: User,
    notificationPreferencesDto: NotificationPreferencesDto,
  ) {
    if (!user.notification_preferences) {
      user.notification_preferences = this.usersRepository.manager.create(
        'UserNotificationPreferences',
        {},
      ) as any;
    }

    Object.assign(user.notification_preferences, notificationPreferencesDto);

    await this.usersRepository.save(user);

    return user.notification_preferences;
  }

  async findNotificationPreferences(user: User) {
    const foundUser = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['notification_preferences'],
    });

    return foundUser?.notification_preferences;
  }
}
