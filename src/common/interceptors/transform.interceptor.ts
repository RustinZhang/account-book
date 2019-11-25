import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  public intercept(context: ExecutionContext, next: CallHandler<T>): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
    return next
      .handle()
      .pipe(map((data: any) => {
        const { message, errorCode, ...result } = data;
        return {
          errorCode: errorCode || 0,
          message: message || '请求成功',
          success: !errorCode,
          data: result,
        };
      }));
  }
}
