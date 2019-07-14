import { Module, Global } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Global()
@Module({
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
