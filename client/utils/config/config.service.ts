import * as fs from 'fs';
import * as dotenv from 'dotenv';

import { EnvConfig } from './interfaces/envConfig.interface';

export class ConfigService {
  private readonly filePath: string;
  private readonly envConfig: EnvConfig;

  constructor() {
    this.filePath = process.env.NODE_ENV || '';
    this.envConfig = {
      ...dotenv.parse(fs.readFileSync(`${this.filePath}.env`)),
    }
  }

  getSetting(key: string): any {
    const variable = this.envConfig[key];

    if (/true|false/.test(variable)) {
      return Boolean(variable);
    }

    if (!Number.isNaN(+variable)) {
      return +variable;
    }

    return this.envConfig[key];
  }
}
