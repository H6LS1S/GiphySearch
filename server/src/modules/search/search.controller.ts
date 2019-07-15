import { Param, Get } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { SearchService } from './search.service';

import { Users } from '../users/users.entity';

@ApiUseTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async selectTrending(): Promise<Users> {
    return await this.searchService.selectTrending();
  }

  @Get(':tag')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async selectByTag(@Param('tag') tag: string): Promise<Users> {
    return await this.searchService.selectByTag(tag);
  }
}
