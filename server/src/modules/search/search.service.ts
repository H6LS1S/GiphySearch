import { Injectable } from '@nestjs/common';

import { ConfigService } from '../../config/config.service';

@Injectable()
export class SearchService {
  constructor(private readonly configService: ConfigService) {}

  private readonly giphy = require('giphy-api')(
    this.configService.getSetting('GIPHY_API_TOKEN'),
  );

  async selectTrending() {
    return await this.giphy.trending();
  }

  async selectByTag(tag: string) {
    return await this.giphy.search(tag);
  }
}
