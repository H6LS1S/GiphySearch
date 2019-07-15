import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { History } from './history.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async create(user: Users, tag: string): Promise<History> {
    return await this.historyRepository.save({
      tag: tag,
      user: user,
    });
  }

  async select(user: Users): Promise<History[]> {
    return await this.historyRepository.find({
      where: {
        user: user,
      },
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.historyRepository.delete(id);
  }
}
