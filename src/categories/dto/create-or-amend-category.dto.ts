import { IsBoolean, IsString } from 'class-validator';

export class CreateOrAmendCategoryDto {
  @IsString()
  readonly categoryName: string;

  @IsBoolean()
  readonly isExpense: boolean;
}
