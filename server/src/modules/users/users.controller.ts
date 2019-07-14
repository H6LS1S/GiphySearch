import { Body, Post } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import { ApiUseTags } from '@nestjs/swagger';

import { UserCreateDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { Users } from './users.entity';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: UserCreateDto): Promise<Users> {
    return await this.usersService.create(data).catch(() => {
      throw new HttpException(`User already exists`, HttpStatus.CONFLICT);
    });
  }
}
