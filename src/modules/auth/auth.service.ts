import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { UserService } from '../user/user.service';
import { RedisInstance } from 'src/database/redis';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { WXBizDataCrypt } from 'src/utils/WXBizDataCrypt';
import { User } from '../user/entities/user.entity';
import { createUniqueId } from 'src/utils/util';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private appId = this.configService.get<string>('wechat.appId');
  private secret = this.configService.get<string>('wechat.secret');
  private authorizationCode =
    this.configService.get<string>('wechat.grantType');

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(name: string, password: string) {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.findOneByName(name);
    if (user) {
      const hashedPassword = user.password;
      const salt = user.salt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        return this.certificate(user);
      } else if (user.status === 0) {
        throw new HttpException(
          '账户已停用，请联系管理员',
          HttpStatus.BAD_GATEWAY,
        );
      } else {
        throw new HttpException('用户名或密码错误', HttpStatus.BAD_GATEWAY);
      }
    } else {
      throw new HttpException('查无此人', HttpStatus.BAD_GATEWAY);
    }
  }

  // 微信登录验证 - Step 1: 用户请求登录
  async validateWechat(code, iv, encryptedData) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?grant_type=${this.authorizationCode}&appid=${this.appId}&secret=${this.secret}&js_code=${code}`;
    const info = await this.getInfo(url); // 获取openid和session_key
    const user = await this.userService.findOneByOpenId(info.data.openid);
    if (user) {
      return this.certificate(user);
    } else {
      // 新增一条信息
      const pc = new WXBizDataCrypt(this.appId, info.data.session_key);
      const data = pc.decryptData(encryptedData, iv);
      const salt = makeSalt();
      const hasPwd = encryptPassword(
        this.configService.get('user.default'),
        salt,
      );
      const newUser = new User();
      newUser.id = createUniqueId();
      newUser.loginName = salt;
      newUser.salt = salt;
      newUser.password = hasPwd;
      newUser.openId = info.data.openid;
      newUser.nickname = info.data.nickname;
      newUser.appId = this.appId;
      newUser.avatar = data.avatarUrl;
      newUser.gender = data.gender;

      const res = await this.userService.create(newUser);
      return this.certificate(res);
    }
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      name: user.loginName,
      id: user.id,
      role: user.role,
    };

    console.log('JWT验证 - Step 3: 处理 jwt 签证');

    try {
      const token = this.jwtService.sign(payload);
      // 实例化 redis
      const redis = await RedisInstance.initRedis('auth.certificate', 0);
      // 将用户信息和 token 存入 redis，并设置失效时间，语法：[key, seconds, value]
      await redis.setex(`${user.id}-${user.loginName}`, 28800, `${token}`);
      return token;
    } catch (error) {
      throw new HttpException('账号或密码错误', HttpStatus.BAD_GATEWAY);
    }
  }

  /**
   * 微信小程序官方 获取用户信息
   * @param url url地址
   * @returns
   */
  getInfo(url): Promise<any> {
    return this.httpService
      .post(url)
      .pipe(map((response) => response))
      .toPromise();
  }
}
