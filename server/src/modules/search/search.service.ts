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

  async comparisonWithLikes(data): Promise<any> {
    for await (let image of data) {
      image.likes = await this.likesService.selectByImage(image.id);
    }
    return data;
  }

  async selectTrending(): Promise<[]> {
    const { data } = await this.giphy.trending();
    return await this.comparisonWithLikes(data);
  }

  async selectIds(scope: [string] | string[]): Promise<[]> {
    const { data } = await this.giphy.id(scope);
    return await this.comparisonWithLikes(data);
  }

  async selectByTag(tag: string): Promise<[]> {
    const { data } = await this.giphy.search(tag);
    return await this.comparisonWithLikes(data);
  }
}
