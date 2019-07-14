import { Body, Post, Put } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '../../common/decorators/user.decorator';

import { AuthService } from './auth.service';
import { JwtToken } from './interfaces/jwt.interface';

import { UserCreateDto } from '../users/dto/user.dto';
import { Users } from '../users/users.entity';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() data: UserCreateDto): Promise<JwtToken> {
    const validate = await this.authService.validate(data);
    if (validate) {
      return await this.authService.create({
        email: data.email,
      });
    }
    throw new UnauthorizedException();
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(@User() users: Users): Promise<JwtToken> {
    return await this.authService.create({
      email: users.email,
    });
  }
}
