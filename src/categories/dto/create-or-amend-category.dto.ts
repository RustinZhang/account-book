import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateOrAmendCategoryDto {
  @IsString()
  @Length(1, 6)
  readonly categoryName: string;

  @IsBoolean()
  readonly isExpense: boolean;
}
