import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '主键Id' })
  id: string;

  @ApiProperty({ description: '登录名' })
  @IsNotEmpty({ message: '登录名必填' })
  readonly loginName: string;

  @ApiProperty({ description: '登录密码' })
  password: string;

  @ApiProperty({ description: '密钥' })
  salt: string;

  @ApiProperty({ description: '用户头像）' })
  readonly avatar: string;

  @ApiProperty({ description: '用户备注' })
  readonly remark: string;

  @ApiProperty({ description: '用户权限' })
  @IsNotEmpty({ message: '用户权限必填' })
  readonly role: number;

  @ApiProperty({ description: '用户邮箱' })
  readonly email: string;

  @ApiProperty({ description: '用户手机号' })
  readonly mobile: string;

  @ApiProperty({ description: '用户性别' })
  readonly gender: number;

  @ApiProperty({ description: '微信登录openId' })
  readonly openId: string;

  @ApiProperty({ description: '微信登录appId' })
  readonly appId: string;

  @ApiProperty({ description: '上次登录时间' })
  readonly lastTime: Date;

  @ApiProperty({ description: '用户标签' })
  readonly tag: string;
}
