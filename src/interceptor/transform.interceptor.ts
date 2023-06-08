// src/interceptor/transform.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from 'src/utils/log4js';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data) => {
        // 组装日志信息
        const logFormat = `拦截器: 请求地址: ${req.originalUrl} - 请求方式: ${req.method} - IP: ${req.ip}`;
        Logger.info(logFormat);
        Logger.access(logFormat);
        return {
          data,
          status: 200,
          message: '请求成功',
        };
      }),
    );
  }
}
