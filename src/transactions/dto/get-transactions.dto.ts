import { IsInt } from 'class-validator';

export class GetTransactionsDto {
  @IsInt()
  readonly size: number;

  @IsInt()
  readonly page: number;
}
