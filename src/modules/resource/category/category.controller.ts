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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';

const { ROLE_LIST } = useDefaultUserConfig();

@ApiBearerAuth() // Swagger 的 JWT 验证
@Controller('resource')
@ApiTags('图书分类数据接口')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * 新增图书分类信息
   * @param list
   * @returns
   */
  @ApiOperation({ summary: '新增图书分类信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Post('/category/create-category')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.createCategory(body);
  }

  /**
   * 根据d查找分类信息
   * @param id
   * @returns
   */
  @ApiOperation({ summary: '根据d查找分类信息' })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Get('/category/find-category-by-id')
  findCategoryById(@Query('id') id: number) {
    return this.categoryService.findCategoryById(id);
  }

   /**
   * 更新分类信息
   * @param update 
   * @returns 
   */
   @ApiOperation({ summary: '更新分类信息' })
   @UseInterceptors(ClassSerializerInterceptor)
   @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
   @UseGuards(AuthGuard('jwt'))
   @Put('/category/update-category')
   updateCategory(@Body() update: UpdateCategoryDto) {
     return this.categoryService.updateCategory(update);
   }

   /**
   * 批量删除分类信息
   * @param ids 分类Id数组
   * @returns
   */
  @ApiOperation({ summary: '批量删除分类信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Delete('/category/delete-categories')
  removeList(@Query('id') ids: number[]) {
    return this.categoryService.removeList(ids);
  }

  /**
   * 递归查询分类信息
   * @param ids 
   * @returns 
   */
  @ApiOperation({ summary: '递归查询分类信息' })
  @UseGuards(new RbacGuard(ROLE_LIST.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @Get('/category/find-category-tree')
  findCategoryTree() {
    return this.categoryService.findCategoryTree();
  }
}
