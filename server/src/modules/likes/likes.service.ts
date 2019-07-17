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
    private readonly likesRepository: Repository<Likes>,
  ) {}

  async create(user: Users, data: LikeCreateDto): Promise<Likes> {
    return await this.likesRepository.save({
      ...data,
      user: user,
    });
  }

  async selectByImage(image: string): Promise<Likes[]> {
    return await this.likesRepository.find({
      where: {
        image: image,
      },
    });
  }

  async selectByUser(user: Users): Promise<Likes[]> {
    return await this.likesRepository.find({
      where: {
        user: user,
      },
    });
  }

  async delete(user: Users, data: LikeCreateDto): Promise<DeleteResult> {
    return await this.likesRepository.delete({
      image: data.image,
      user: user,
    });
  }
}
