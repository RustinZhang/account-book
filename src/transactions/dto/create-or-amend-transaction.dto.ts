import { IsDateString, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateOrAmendTransactionDto {
  @IsInt()
  readonly categoryCode: number;

  @IsNumber()
  readonly amount: number;

  @IsString()
  readonly remark: string;

  @IsDateString()
  readonly date: string;
}
