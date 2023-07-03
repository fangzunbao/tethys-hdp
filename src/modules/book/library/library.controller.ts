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
import { LibraryBookService } from './library.service';
import { CreateLibraryBookDto } from '../dto/create.library.book.dto';
import { UpdateLibraryBookDto } from '../dto/update.library.book.dto';

const { ROLE_LIST } = useDefaultUserConfig();

@ApiBearerAuth() // Swagger 的 JWT 验证
@Controller('book')
@ApiTags('图书数据接口')
export class LibraryBookController {
  constructor(private readonly libraryBookService: LibraryBookService) {}

  /**
   * 新增书柜图书信息
   * @param body
   * @returns
   */
  @ApiOperation({ summary: '新增书柜图书信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post('/library/create-library-book')
  createLibraryBook(@Body() body: CreateLibraryBookDto) {
    return this.libraryBookService.createLibraryBook(body);
  }

  /**
   * 根据Id查找书柜图书信息
   * @param id
   * @returns
   */
  @ApiOperation({ summary: '根据Id查找书柜图书信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Get('/library/find-library-book-by-id')
  findLibraryBookById(@Query('id') id: string) {
    return this.libraryBookService.findLibraryBookById(id);
  }

  /**
   * 更新书柜图书信息
   * @param update
   * @returns
   */
  @ApiOperation({ summary: '更新书柜图书信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Put('/library/update-library-book')
  updateLibraryBook(@Body() update: UpdateLibraryBookDto) {
    return this.libraryBookService.updateLibraryBook(update);
  }

  /**
   * 批量删除书柜图书信息
   * @param ids
   * @returns
   */
  @ApiOperation({ summary: '批量删除书柜图书信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Delete('/library/remove-library-books')
  removeLibraryBookList(@Query('id') ids: string[]) {
    return this.libraryBookService.removeLibraryBookList(ids);
  }

  @ApiOperation({ summary: '分页查询书柜图书信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  @Post('/library/find-page-library-books')
  pageQueryFind(@Query() query, @Body() Body) {
    return this.libraryBookService.pageQueryFind(query, Body);
  }
}
