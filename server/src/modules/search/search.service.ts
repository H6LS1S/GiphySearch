import { Injectable } from '@nestjs/common';

import { ConfigService } from '../../config/config.service';

import { LikesService } from '../likes/likes.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly likesService: LikesService,
  ) {}

  private readonly giphy = require('giphy-api')(
    this.configService.getSetting('GIPHY_API_TOKEN'),
  );

  async selectTrending(): Promise<[]> {
    const { data } = await this.giphy.trending();
    return data;
  }

  async selectIds(scope: [string] | string[]): Promise<[]> {
    const { data } = await this.giphy.id(scope);
    return data;
  }

  async selectByTag(tag: string): Promise<[]> {
    let { data } = await this.giphy.search(tag);
    for await (let image of data) {
      image.likes = await this.likesService.selectByImage(image.id);
    }
    return data;
  }
}
