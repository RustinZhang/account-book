import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AccessForbidden } from '../exceptions/access-forbidden.exception';

export class ApiParamsValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        // 如果参数不是类而是普通的JavaScript对象则不进行验证
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            const error = errors.shift();
            const constraints = error.constraints;
            const contexts = error.contexts;
            for (const key in constraints) {
                if (constraints.hasOwnProperty(key)) {
                    throw new AccessForbidden({
                        errorCode: contexts[key].errorCode,
                        message: constraints[key],
                    });
                }
            }
        }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
