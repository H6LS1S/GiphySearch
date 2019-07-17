import { Body, Param, Post, Get } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';

import { SearchService } from './search.service';
import { HistoryService } from '../history/history.service';

import { Users } from '../users/users.entity';

@ApiUseTags('search')
@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly historyService: HistoryService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async selectIds(@Body() scope: [string]): Promise<[]> {
    return await this.searchService.selectIds(scope);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async selectTrending(): Promise<[]> {
    return await this.searchService.selectTrending();
  }

  @Get(':tag')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async selectByTag(
    @User() user: Users,
    @Param('tag') tag: string,
  ): Promise<[]> {
    await this.historyService.create(user, tag);
    return await this.searchService.selectByTag(tag);
  }
}
