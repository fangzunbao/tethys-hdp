// src/database/redis.ts
import Redis from 'ioredis';
import { Logger } from '../utils/log4js';
import { ConfigService } from '@nestjs/config';

let n: number = 0;
const redisIndex = []; // 用于记录 redis 实例索引
const redisList = []; // 用于存储 redis 实例

export class RedisInstance {
  constructor(private configService: ConfigService) {}
  static async initRedis(method: string, db: number = 0) {
    const isExist = redisIndex.some((x) => x === db);
    if (!isExist) {
      Logger.debug(
        `[Redis ${db}]来自 ${method} 方法调用, Redis 实例化了 ${++n} 次 `,
      );
      // const config = this.configService.get<string>('redis');
      // console.log('config: ', config);

      redisList[db] = new Redis({
        ...{
          port: 6379,
          host: '81.70.97.245',
          db: 0,
          password: '170901@Fzb',
        },
        db,
      });
      redisIndex.push(db);
    } else {
      Logger.debug(`[Redis ${db}]来自 ${method} 方法调用`);
    }
    return redisList[db];
  }
}
