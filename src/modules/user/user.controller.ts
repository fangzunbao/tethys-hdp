import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac.guard';
import { useDefaultUserConfig } from '../../config/roles';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { WechatLoginDTO } from './dto/wechat-login.dto';
import { CreateUserOtherAccountDto } from './dto/create.otherAccount.dto';
import { UpdateUserOtherAccountDto } from './dto/update.otherAccount.dto';

const { ROLE_LIST } = useDefaultUserConfig();

@ApiBearerAuth() // Swagger 的 JWT 验证
@Controller('user')
@ApiTags('用户模块数据接口')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  private roles = this.configService.get<string>('user.roleList');

  /**
   * 登录系统
   * @param loginUserDto 登录名和密码
   * @returns
   */
  @ApiOperation({ summary: '登录系统' })
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    return this.authService.validateUser(
      loginUserDto.loginName,
      loginUserDto.password,
    );
  }

  @ApiOperation({ summary: '微信登录' })
  @Post('/wechat-login')
  async wechatLoginValidate(@Body() wechat: WechatLoginDTO) {
    console.log('微信登录验证 - Step 1: 用户请求登录');
    return this.authService.validateWechat(
      wechat.code,
      wechat.iv,
      wechat.encryptedData,
    );
  }

  /**
   * 根据Token获取当前用户信息
   * @param request 请求信息
   * @returns
   */
  @ApiOperation({ summary: '根据Token获取当前用户信息' })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/find-current-user')
  findCurrentUser(@Req() request) {
    return request.user;
  }

  /**
   * 创建一个新用户
   * @param user 新建用户对象
   * @returns
   */
  @ApiOperation({ summary: '新增一个用户信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Post('/create-user')
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  /**s
   * 根据Id查询用户信息
   * @param id 用户ID
   * @returns
   */
  @ApiOperation({ summary: '根据Id值查询一个用户信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Get('/find-user-by-id')
  findOne(@Query('id') id: string) {
    return this.userService.findOne(id);
  }

  /**
   * 更新用户信息
   * @param updateUserDto 待更新的用户信息
   * @returns
   */
  @ApiOperation({ summary: '更新用户信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Put('/update-user')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  /**
   * 更新用户状态和权限【仅限管理员】
   * @param updateUserDto 待更新的用户信息
   * @returns
   */
  @ApiOperation({ summary: '更新用户状态和权限【仅限管理员】' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Put('/update-user-by-admin')
  updateByAdmin(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  /**
   * 删除用户信息
   * @param id 用户ID
   * @returns
   */
  @ApiOperation({ summary: '删除用户信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-user')
  remove(@Query('id') id: string) {
    return this.userService.remove(id);
  }

  /**
   * 批量删除用户信息
   * @param ids 用户Id数组
   * @returns
   */
  @ApiOperation({ summary: '批量删除用户信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-users')
  removeList(@Query('id') ids: string[]) {
    return this.userService.removeList(ids);
  }

  /**
   * 分页查询用户列表信息
   * @param query 分页参数
   * @param Body 查询条件
   * @returns
   */
  @ApiOperation({ summary: '分页查询用户列表信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Post('/find-page-users')
  pageQueryFind(@Query() query, @Body() Body) {
    return this.userService.pageQueryFind(query, Body);
  }

  /**
   * 新添加第三方账号
   * @param body 
   * @param id 
   * @returns 
   */
  @ApiOperation({ summary: '新添加第三方账号' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Post('/create-user-other-account')
  createOtherAccount(@Body() body: CreateUserOtherAccountDto, @Query('id') id) {
    return this.userService.createOtherAccount(body, id);
  }

  /**
   * 更新第三方账号
   * @param update 
   * @returns 
   */
  @ApiOperation({ summary: '更新第三方账号' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Put('/update-user-other-account')
  updateOtherAccount(@Body() update: UpdateUserOtherAccountDto) {
    return this.userService.updateOtherAccount(update);
  }

  /**
   * 根据ID查找第三方账号信息
   * @param id 
   * @returns 
   */
  @ApiOperation({ summary: '根据ID查找第三方账号信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Get('/find-user-other-account-by-id')
  findOtherAccountById(@Query('id') id) {
    return this.userService.findOtherAccountById(id);
  }
}
