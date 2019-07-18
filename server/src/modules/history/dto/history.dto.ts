import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray } from 'class-validator';

export class HistoryCreateDto {
	@IsNumber()
	@ApiModelProperty()
	readonly id: number;

	@IsString()
	@ApiModelProperty()
	readonly tag: string;
}
