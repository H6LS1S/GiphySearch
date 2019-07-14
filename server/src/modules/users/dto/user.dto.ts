import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiModelProperty()
  readonly password: string;
}
