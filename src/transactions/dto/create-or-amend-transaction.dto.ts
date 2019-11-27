import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { getNotEmptyOption, getNotPositiveOption, getWrongTypeOption } from '../../common/utils/utils';
import { CheckDate } from '../../common/validators/date.validator';

export class CreateOrAmendTransactionDto {
  @IsNotEmpty(getNotEmptyOption())
  @IsInt(getWrongTypeOption('整数'))
  readonly categoryCode: number;

  @IsNotEmpty(getNotEmptyOption())
  @IsNumber({
      allowNaN: false,
      allowInfinity: false,
      maxDecimalPlaces: 2,
    },
    getWrongTypeOption('最多两位小数的数值'),
  )
  @IsPositive(getNotPositiveOption())
  readonly amount: number;

  @IsNotEmpty(getNotEmptyOption())
  @IsString(getWrongTypeOption('字符'))
  readonly remark: string;

  @IsNotEmpty(getNotEmptyOption())
  @IsDateString({ message: '$property必须是日期字符串' })
  @CheckDate({ message: '$property必须是YYYY/MM/DD格式' })
  readonly date: string;
}
