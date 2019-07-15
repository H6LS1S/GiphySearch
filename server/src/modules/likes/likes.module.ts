import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { Likes } from './likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likes])],
  providers: [LikesService],
  controllers: [LikesController],
  exports: [LikesService],
})
export class LikesModule {}
