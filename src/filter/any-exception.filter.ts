// src/filter/any-exception.filter.ts
/**
 * 捕获所有异常
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../utils/log4js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 组装日志信息
    const logFormat = `其他错误: 请求地址: ${request.originalUrl} - 请求方式: ${request.method} - IP: ${request.ip} - 响应码: ${status}`;
    Logger.error(logFormat);
    response.status(status).json({
      statusCode: status,
      msg: `Service Error: ${exception}`,
    });
  }
}
