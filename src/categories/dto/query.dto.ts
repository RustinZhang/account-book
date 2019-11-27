import { IsNumberString, IsString, IsOptional, Length } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsString()
  @Length(1, 6, { message: '分类长度只能在1到6之间' })
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsNumberString()
  readonly code: string;

}
