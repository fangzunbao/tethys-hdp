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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guards/rbac.guard';
import { useDefaultUserConfig } from '../../../config/roles';
import { ReadingBookService } from './reading.service';
import { UpdateReadingBookDto } from '../dto/update.reading.book.dto';
import { CreateReadingBookDto } from '../dto/create.reading.book.dto';

const { ROLE_LIST } = useDefaultUserConfig();

@ApiBearerAuth() // Swagger 的 JWT 验证
@Controller('book')
@ApiTags('阅读图书数据接口')
export class ReadingBookController {
  constructor(private readonly readingBookService: ReadingBookService) {}

  /**
   * 新增阅读图书信息
   * @param body
   * @returns
   */
  @ApiOperation({ summary: '新增阅读图书信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post('/reading/create-reading-book')
  createReadingBook(@Body() body: CreateReadingBookDto) {
    return this.readingBookService.createReadingBook(body);
  }

  /**
   * 根据Id查找阅读图书信息
   * @param id
   * @returns
   */
  @ApiOperation({ summary: '根据Id查找阅读图书信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Get('/reading/find-reading-book-by-id')
  findReadingBookById(@Query('id') id: string) {
    return this.readingBookService.findReadingBookById(id);
  }

  /**
   * 更新阅读图书信息
   * @param update
   * @returns
   */
  @ApiOperation({ summary: '更新阅读图书信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Put('/reading/update-reading-book')
  updateReadingBook(@Body() update: UpdateReadingBookDto) {
    return this.readingBookService.updateReadingBook(update);
  }

  /**
   * 批量删除阅读图书信息
   * @param ids
   * @returns
   */
  @ApiOperation({ summary: '批量删除阅读图书信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Delete('/reading/remove-reading-books')
  removeReadingBookList(@Query('id') ids: string[]) {
    return this.readingBookService.removeReadingBookList(ids);
  }

  /**
   * 分页查询阅读图书信息
   * @param query 
   * @param Body 
   * @returns 
   */
  @ApiOperation({ summary: '分页查询阅读图书信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Post('/reading/find-page-reading-books')
  pageQueryFind(@Query() query, @Body() Body) {
    return this.readingBookService.pageQueryFind(query, Body);
  }
}
