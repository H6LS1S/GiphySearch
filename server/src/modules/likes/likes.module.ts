import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { Likes } from './likes.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Likes])],
  providers: [LikesService],
  controllers: [LikesController],
  exports: [LikesService],
})
export class LikesModule {}
