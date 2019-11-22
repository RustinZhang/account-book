import { IsNumberString, IsString } from 'class-validator';

export class QueryDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly type: string;

  @IsNumberString()
  readonly code: string;

}
