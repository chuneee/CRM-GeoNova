import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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
    const user = await this.usersRepository.findOne({ where: { id } });

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
}
