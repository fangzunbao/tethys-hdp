import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalService } from './global.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateSwiperDto } from './dto/swiper.create.dto';
import { UpdateSwiperDto } from './dto/swiper.update.dto';

@Controller('global')
@ApiTags('全局应用数据【无需token】')
export class GlobalController {
  constructor(private readonly globalService: GlobalService) {}

  /**
   * 创建一个轮播图项
   * @param body
   * @returns
   */
  @ApiOperation({ summary: '创建一个轮播图项' })
  @Post('/create-swiper-item')
  createSwiperItem(@Body() body: CreateSwiperDto) {
    console.log('body: ', body);

    return this.globalService.createSwiperItem(body);
  }

  /**
   * 列出所有轮播图列表
   * @param appId
   * @returns
   */
  @ApiOperation({ summary: '列出所有轮播图列表' })
  @Get('/find-all-swiper-item')
  findAllSwiperItem(@Query('appId') appId: string) {
    return this.globalService.findAllSwiperItem(appId);
  }

  /**
   * 更新轮播图项
   * @param body
   * @returns
   */
  @ApiOperation({ summary: '更新轮播图项' })
  @Put('/update-swiper-item')
  updateSwiperItem(@Body() body: UpdateSwiperDto) {
    return this.globalService.updateSwiperItem(body);
  }

  /**
   * 删除一个Item项
   * @param id
   * @returns
   */
  @ApiOperation({ summary: '删除一个Item项' })
  @Delete('/delete-swiper-item')
  removeSwiperItem(@Query('id') id: string) {
    return this.globalService.removeSwiperItem(id);
  }

  /**
   * 删除多个Item项
   * @param ids
   * @returns
   */
  @ApiOperation({ summary: '删除多个Item项' })
  @Delete('/delete-swiper-item')
  removeSwiperItems(@Query('id') ids: string[]) {
    return this.globalService.removeSwiperItems(ids);
  }
}
