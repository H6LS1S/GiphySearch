import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigService } from '../../../config/config.service';

import { UsersService } from '../../users/users.service';
import { UserCreateDto } from '../../users/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getSetting('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: UserCreateDto) {
    const users = await this.usersService.selectByEmail(payload.email);
    if (users) {
      return users;
    }
    throw new UnauthorizedException();
  }
}
