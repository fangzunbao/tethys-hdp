import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { createUniqueId } from 'src/utils/util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageDto } from '../common/dto/page.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { BasePage } from '../common/dto/entities/baseInfo.entity';
import { UserOtherAccount } from './entities/other.account.entity';
import { CreateUserOtherAccountDto } from './dto/create.otherAccount.dto';
import { UpdateUserOtherAccountDto } from './dto/update.otherAccount.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserOtherAccount)
    private otherAccountRepository: Repository<UserOtherAccount>,
    private readonly config: ConfigService,
  ) {}

  /**
   * 创建一个新用户
   * @param user 新建用户对象
   * @returns
   */
  async create(user: CreateUserDto) {
    user.id = createUniqueId();
    const salt = makeSalt();
    const hasPwd = encryptPassword(this.config.get('user.default'), salt);
    user.salt = salt;
    user.password = hasPwd;
    const userInfo = await this.userRepository.save(user);
    const otherAccounts = [];
    if (user.otherAccount && user.otherAccount.length > 0) {
      user.otherAccount.forEach(async (item) => {
        const otherAccount = new UserOtherAccount();
        otherAccount.id = createUniqueId();
        otherAccount.label = item.label;
        otherAccount.value = item.value;
        otherAccount.user = userInfo;
        this.otherAccountRepository.save(otherAccount);
        otherAccounts.push(otherAccount);
      });
    }
    return await this.findOne(userInfo.id);
  }

  /**
   * 根据用户的openId查找用户
   * @param openId openId
   * @returns
   */
  async findOneByOpenId(openId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { openId },
      relations: ['otherAccount'],
    });
  }

  /**
   * 根据Id查找用户信息
   * @param id 用户Id
   * @returns 用户信息｜null
   */
  async findOne(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['otherAccount'],
    });
    return user;
  }

  /**
   * 根据登录名查找用户信息
   * @param name 用户登录名
   * @returns
   */
  async findOneByName(loginName: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { loginName },
      relations: ['otherAccount'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  updateByAdmin(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

  removeList(ids: string[]) {
    return this.userRepository.delete(ids);
  }

  async pageQueryFind(page: PageDto, query: QueryUserDto) {
    const userList = await this.userRepository.find({
      where: {
        id: Not(query.id),
        ...(query.keyword && { loginName: Like(`%${query.keyword}%`) }),
        ...(query.status !== -1 && { status: query.status }),
        ...(query.role !== -1 && { role: query.role }),
        ...(query.startTime && {
          create_time: MoreThanOrEqual(new Date(query.startTime)),
        }),
        ...(query.endTime && {
          createTime: LessThanOrEqual(new Date(query.endTime)),
        }),
      },
      skip: (page.pageNum - 1) * page.pageSize,
      take: page.pageSize,
      cache: true,
    });
    const total = await this.userRepository.count({
      where: {
        id: Not(query.id),
        ...(query.keyword && { loginName: Like(`%${query.keyword}%`) }),
        ...(query.status !== -1 && { status: query.status }),
        ...(query.role !== -1 && { role: query.role }),
        ...(query.startTime && {
          create_time: MoreThanOrEqual(new Date(query.startTime)),
        }),
        ...(query.endTime && {
          createTime: LessThanOrEqual(new Date(query.endTime)),
        }),
      },
    });
    return new BasePage(page.pageNum, page.pageSize, total, userList);
  }

  async createOtherAccount(body: CreateUserOtherAccountDto, id: string) {
    const userInfo = await this.findOne(id);
    const otherAccount = new UserOtherAccount();
    otherAccount.id = createUniqueId();
    otherAccount.label = body.label;
    otherAccount.value = body.value;
    otherAccount.user = userInfo;
    return await this.otherAccountRepository.save(otherAccount);
  }

  async updateOtherAccount(body: UpdateUserOtherAccountDto) {
    return this.otherAccountRepository.update(body.id, body);
  }

  async findOtherAccountById(id: string) {
    return this.otherAccountRepository.findOne({ where: { id } });
  }
}
