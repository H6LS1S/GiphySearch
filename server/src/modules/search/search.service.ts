import { Injectable } from '@nestjs/common';
import * as giphy from 'giphy-api';

import { ConfigService } from '../../config/config.service';

import { LikesService } from '../likes/likes.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly likesService: LikesService,
  ) {}

  private readonly giphy = giphy(
    this.configService.getSetting('GIPHY_API_TOKEN'),
  );

  async selectTrending(): Promise<[]> {
    const { data } = await this.giphy.trending();
    return await this.likesService.comparison(data);
  }

  async selectIds(scope: [string] | string[]): Promise<[]> {
    const { data } = await this.giphy.id(scope);
    return data;
  }

  async selectByTag(tag: string): Promise<[]> {
    const { data } = await this.giphy.search(tag);
    return await this.likesService.comparison(data);
  }
}
