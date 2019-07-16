import { Injectable } from '@nestjs/common';

import { ConfigService } from '../../config/config.service';

@Injectable()
export class SearchService {
  constructor(private readonly configService: ConfigService) {}

  private readonly giphy = require('giphy-api')(
    this.configService.getSetting('GIPHY_API_TOKEN'),
  );

  async selectTrending(): Promise<[]> {
    const { data } = await this.giphy.trending();
    return data;
  }

  async selectByTag(tag: string): Promise<[]> {
    const { data } = await this.giphy.search(tag);
    return data;
  }
}
