import { Module, Global } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';

import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';
import { LikesModule } from '../modules/likes/likes.module';
import { HistoryModule } from '../modules/history/history.module';

@Global()
@Module({
  imports: [
    ConfigModule,
    DatabaseModule,

    AuthModule,
    UsersModule,
    LikesModule,
    HistoryModule,
  ],
})
export class AppModule {}
