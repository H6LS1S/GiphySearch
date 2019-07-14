import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { ConfigService } from '../../config/config.service';

import { UsersService } from '../users/users.service';
import { UserCreateDto } from '../users/dto/user.dto';
import { Users } from '../users/users.entity';

import { JwtPayload, JwtToken } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  [x: string]: any;
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async compare(data: UserCreateDto, users: Users): Promise<boolean> {
    return await compare(data.password, users.password);
  }

  async create(payload: JwtPayload): Promise<JwtToken> {
    const token = await this.jwtService.sign(payload);
    return {
      expiresIn: this.configService.getSetting('JWT_EXPIRES_TIME'),
      token: token,
    };
  }

  async validate(payload: UserCreateDto): Promise<Boolean> {
    const user = await this.usersService.selectByEmail(payload.email);
    return await this.compare(payload, user);
  }
}
