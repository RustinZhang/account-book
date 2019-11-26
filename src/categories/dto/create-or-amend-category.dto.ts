import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateOrAmendCategoryDto {
  @IsString({ message: '分类名称必须是字符串', context: { errorCode: 111 } })
  @Length(1, 6, { message: '分类名称长度只能在1到6之间', context: { errorCode: 222 } })
  readonly categoryName: string;

  @IsBoolean()
  readonly isExpense: boolean;
}
