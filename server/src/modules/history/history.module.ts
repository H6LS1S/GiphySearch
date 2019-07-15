import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { History } from './history.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryService],
  controllers: [HistoryController],
  exports: [HistoryService],
})
export class HistoryModule {}
