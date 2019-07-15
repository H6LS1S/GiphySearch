import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { LikeCreateDto } from './dto/like.dto';
import { Likes } from './likes.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private readonly historyRepository: Repository<Likes>,
  ) {}

  async create(user: Users, data: LikeCreateDto): Promise<Likes> {
    return await this.historyRepository.save({
      ...data,
      user: user,
    });
  }

  async selectByImage(image: string): Promise<Likes[]> {
    return await this.historyRepository.find({
      where: {
        image: image,
      },
    });
  }

  async selectByUser(user: Users): Promise<Likes[]> {
    return await this.historyRepository.find({
      where: {
        user: user,
      },
    });
  }

  async delete(user: Users, data: LikeCreateDto): Promise<DeleteResult> {
    return await this.historyRepository.delete({
      image: data.image,
      user: user,
    });
  }
}
