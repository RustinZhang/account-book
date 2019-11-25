import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException, HttpStatus,
} from '@nestjs/common';
import { ERROR_CODES } from '../../consts';

@Catch()
export class ForbiddenFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errorCode: ERROR_CODES.INVALID_ACCESS_TOKEN,
      message: '无效的token',
      success: false,
      data: {},
    });
  }
}
