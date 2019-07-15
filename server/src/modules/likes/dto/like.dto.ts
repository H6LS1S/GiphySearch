import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { HistoryCreateDto } from '../../history/dto/history.dto';

export class LikeCreateDto {
  @IsString()
  @ApiModelProperty()
  readonly image: string;

  @ValidateNested()
  @Type(() => HistoryCreateDto)
  @ApiModelProperty({ type: [HistoryCreateDto] })
  readonly history: HistoryCreateDto;
}
