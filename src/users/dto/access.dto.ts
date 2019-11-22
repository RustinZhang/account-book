import { IsString } from 'class-validator';

export class AccessDto {
  @IsString()
  readonly userName: string;

  @IsString()
  readonly password: string;
}
