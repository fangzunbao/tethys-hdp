import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SystemService } from './system.service';
import { CreateCodeDto } from './dto/create.code.dto';
import { RbacGuard } from 'src/guards/rbac.guard';
import { useDefaultUserConfig } from '../../config/roles';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCodeDto } from './dto/update.code.dto';
import { CreateDictDto } from './dto/create.dict.dto';
import { UpdateDictDto } from './dto/update.dict.dto';

const { ROLE_LIST } = useDefaultUserConfig();

@ApiBearerAuth() // Swagger 的 JWT 验证
@Controller('system')
@ApiTags('码表模块数据接口')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  // 码表信息
  @ApiOperation({ summary: '新增一个码表信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post('/code/create-code')
  createCode(@Body() body: CreateCodeDto) {
    return this.systemService.createCode(body);
  }

  @ApiOperation({ summary: '更新一个码表信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Put('/code/update-code')
  updateCode(@Body() body: UpdateCodeDto) {
    return this.systemService.updateCode(body);
  }

  @ApiOperation({ summary: '删除一个码表信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Delete('/code/remove-code')
  removeCode(@Query('id') id: string) {
    return this.systemService.removeCode(id);
  }

  @ApiOperation({ summary: '删除多个码表信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Delete('/code/remove-codes')
  removeCodes(@Query('id') ids: string[]) {
    return this.systemService.removeCodes(ids);
  }

  @ApiOperation({ summary: '查询码表信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Get('/code/find-tree-codes')
  findCode() {
    return this.systemService.findCode();
  }

  @ApiOperation({ summary: '根据Id查询码表信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Get('/code/find-code-by-id')
  findCodeById(@Query('id') id: string) {
    return this.systemService.findCodeById(id);
  }

  @ApiOperation({ summary: '根据Id查询码表子信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Get('/code/find-code-children-by-id')
  findCodeChildrenById(@Query('id') id: string) {
    return this.systemService.findCodeChildren(id);
  }

  // 字典信息
  @ApiOperation({ summary: '新增一个字典信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post('/dict/create-dict')
  createDict(@Body() body: CreateDictDto) {
    return this.systemService.createDict(body);
  }

  @ApiOperation({ summary: '更新一个字典信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Put('/dict/update-dict')
  updateDict(@Body() body: UpdateDictDto) {
    return this.systemService.updateDict(body);
  }

  @ApiOperation({ summary: '删除一个字典信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Delete('/dict/remove-dict')
  removeDict(@Query('id') id: string) {
    return this.systemService.removeDict(id);
  }

  @ApiOperation({ summary: '删除多个字典信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Delete('/dict/remove-dicts')
  removeDicts(@Query('id') ids: string[]) {
    return this.systemService.removeDicts(ids);
  }

  @ApiOperation({ summary: '查询字典信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Get('/dict/find-dicts')
  findDict(@Query('code') code: string) {
    return this.systemService.findDict(code);
  }

  @ApiOperation({ summary: '根据Id查询字典信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Get('/dict/find-dict-by-id')
  findDictById(@Query('id') id: string) {
    return this.systemService.findDictById(id);
  }

  
}
