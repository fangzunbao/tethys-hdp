import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

// 函数式中间件
export function LoggerMiddleware(req: Request, res: Response, next: () => any) {
  const code = res.statusCode; // 响应状态码
  next();
  // 组装日志信息
  const logFormat = `中间件: 请求地址: ${req.originalUrl} - 请求方式: ${req.method} - IP: ${req.ip} - 响应码: ${code}`;
  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    Logger.error(logFormat);
  } else if (code >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}
