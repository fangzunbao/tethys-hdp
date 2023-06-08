import { Logger } from '../utils/log4js';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const request = ctx.getRequest();
    const response = ctx.getResponse(); // 获取ctx的response对象
    const status = exception.getStatus(); // 获取异常状态码
    const exceptionRes: any = exception.getResponse();

    // 组装日志信息
    const logFormat = `HTTP错误: 请求地址: ${request.originalUrl} - 请求方式: ${request.method} - IP: ${request.ip} - 异常状态码: ${status}`;
    Logger.error(logFormat);
    const errorResponse = {
      status,
      message: exception.message,
      error: exceptionRes.error,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}
