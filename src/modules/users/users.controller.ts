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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
