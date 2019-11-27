import { IsBoolean, IsString, Length } from 'class-validator';
import { getWrongTypeOption } from '../../common/utils/utils';

export class CreateOrAmendCategoryDto {
  @IsString(getWrongTypeOption('字符串'))
  @Length(1, 6, { message: '分类名称长度只能在1到6之间' })
  readonly categoryName: string;

  @IsBoolean(getWrongTypeOption('boolean'))
  readonly isExpense: boolean;
}
