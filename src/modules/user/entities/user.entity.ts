import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'users',
  orderBy: {
    createTime: 'DESC',
  },
})
export class User {
  @PrimaryColumn({ type: 'varchar', length: 20, comment: '用户ID' })
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
    comment: '登录名',
  })
  loginName: string;

  @Column({ type: 'varchar', length: 50, comment: '用户密码' })
  @Exclude()
  password: string;

  @Column({ type: 'char', length: 6, comment: '密钥' })
  @Exclude()
  salt: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '别名',
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '用户头像',
  })
  avatar: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '用户备注',
  })
  remark: string;

  @Column({
    type: 'tinyint',
    precision: 1,
    default: 3,
    comment:
      '用户权限 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）',
  })
  role: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '邮箱地址',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 11,
    nullable: true,
    comment: '手机号码',
  })
  mobile: string;

  @Column({
    type: 'tinyint',
    precision: 1,
    default: 1,
    comment: '用户性别',
  })
  gender: number;

  @Column({
    type: 'tinyint',
    precision: 1,
    default: 1,
    comment: '用户状态 是否启用(1:启用, 0:停用)',
  })
  status: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '用户标签',
  })
  tag: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '微信登录openId',
  })
  openId: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '微信登录appId',
  })
  appId: string;

  @Column({
    type: 'datetime',
    nullable: true,
    comment: '上次登录时间',
  })
  lastTime: Date;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '修改时间',
  }) 
  updateTime: Date;
}
