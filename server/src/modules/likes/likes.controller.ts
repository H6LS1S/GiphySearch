import { Body, Post, Get } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';

import { LikeCreateDto } from './dto/like.dto';
import { LikesService } from './likes.service';
import { Likes } from './likes.entity';

import { Users } from '../users/users.entity';

@ApiUseTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @User() user: Users,
    @Body() data: LikeCreateDto,
  ): Promise<Likes | DeleteResult> {
    return await this.likesService.create(user, data).catch(async () => {
      return await this.likesService.delete(user, data);
    });
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async select(@User() user: Users): Promise<Likes[]> {
    return await this.likesService.selectByUser(user);
  }
}
