import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserCreateDto } from './dto/user.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(user: UserCreateDto): Promise<Users> {
    return await this.usersRepository.save(user);
  }

  async selectByEmail(email: string): Promise<Users> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async update(user: Users, data: UserCreateDto): Promise<Users> {
    await this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
