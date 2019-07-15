import { Body, Get, Delete } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';

import { HistoryService } from './history.service';
import { History } from './history.entity';

import { Users } from '../users/users.entity';

@ApiUseTags('history')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async select(@User() user: Users): Promise<History[]> {
    return await this.historyService.select(user);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async delete(@Body() data: History) {
    return await this.historyService.delete(data.id).catch(() => {
      throw new HttpException('History not found', HttpStatus.NOT_FOUND);
    });
  }
}
