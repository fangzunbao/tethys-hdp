import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { LibraryBook } from '../entities/library.book.entity';
import { CreateLibraryBookDto } from '../dto/create.library.book.dto';
import { createUniqueId, reFormatArray } from 'src/utils/util';
import { UpdateLibraryBookDto } from '../dto/update.library.book.dto';
import { PageDto } from 'src/modules/common/dto/page.dto';
import { QueryBookDto } from '../dto/query.book.dto';
import { BasePage } from 'src/modules/common/dto/entities/baseInfo.entity';
import { SystemService } from 'src/modules/system/system.service';
import { CategoryService } from 'src/modules/resource/category/category.service';

@Injectable()
export class LibraryBookService {
  constructor(
    @InjectRepository(LibraryBook)
    private libraryBookRepository: Repository<LibraryBook>,
    private readonly systemService: SystemService,
    private readonly categoryService: CategoryService,
  ) {}

  async createLibraryBook(body: CreateLibraryBookDto) {
    body.id = createUniqueId();
    return await this.libraryBookRepository.save(body);
  }

  async findLibraryBookById(id: string) {
    return await this.libraryBookRepository.findOne({
      where: { id },
      cache: true,
    });
  }

  async updateLibraryBook(update: UpdateLibraryBookDto) {
    return await this.libraryBookRepository.update(update.id, update);
  }

  async removeLibraryBookList(id: string[]) {
    return await this.libraryBookRepository.delete(id);
  }

  async pageQueryFind(page: PageDto, query: QueryBookDto) {
    const libraryList = await this.libraryBookRepository.find({
      where: {
        ...(query.keyword && { title: Like(`%${query.keyword}%`) },
        { author: Like(`%${query.keyword}%`) },
        { translator: Like(`%${query.keyword}%`) },
        { isbn: query.keyword },
        { id: query.keyword }),
        ...(query.format && { format: query.format }),
        ...(query.space && { space: query.space }),
        ...(query.nation && { nation: query.nation }),
        ...(query.category && { category: query.category }),
        ...(query.status && { status: query.status }),
        ...(query.buy && { buy: query.buy }),
        ...(query.publisher && { publisher: Like(`%${query.publisher}%`) }),
        ...(query.buyStore && { buyStore: Like(`%${query.buyStore}%`) }),
        ...(query.buyPlatform && { buyPlatform: Like(`%${query.buyPlatform}%`) }),
        ...(query.deliveryCompany && {
          deliveryCompany: query.deliveryCompany,
        }),
        ...(query.payWay && { payWay: query.payWay }),
        ...(query.getWay && { getWay: query.getWay }),
        ...(query.startTime && {
          createTime: MoreThanOrEqual(new Date(query.startTime)),
        }),
        ...(query.endTime && {
          createTime: LessThanOrEqual(new Date(query.endTime)),
        }),
      },
      skip: (page.pageNum - 1) * page.pageSize,
      take: page.pageSize,
      cache: true,
    });
    const total = await this.libraryBookRepository.count({
      where: {
        ...(query.keyword && { title: Like(`%${query.keyword}%`) },
        { author: Like(`%${query.keyword}%`) },
        { translator: Like(`%${query.keyword}%`) },
        { isbn: query.keyword },
        { id: query.keyword }),
        ...(query.format && { format: query.format }),
        ...(query.space && { space: query.space }),
        ...(query.nation && { nation: query.nation }),
        ...(query.category && { category: query.category }),
        ...(query.status !== -1 && { status: query.status }),
        ...(query.buy !== -1 && { buy: query.buy }),
        ...(query.publisher && { publisher: query.publisher }),
        ...(query.buyStore && { buyStore: query.buyStore }),
        ...(query.buyPlatform && { buyPlatform: query.buyPlatform }),
        ...(query.deliveryCompany && {
          deliveryCompany: query.deliveryCompany,
        }),
        ...(query.payWay && { payWay: query.payWay }),
        ...(query.startTime && {
          createTime: MoreThanOrEqual(new Date(query.startTime)),
        }),
        ...(query.endTime && {
          createTime: LessThanOrEqual(new Date(query.endTime)),
        }),
      },
    });
    const dictList = reFormatArray(await this.systemService.findDictByCode());

    const categories = await this.categoryService.findCategoryTree()

    return new BasePage(
      page.pageNum,
      page.pageSize,
      total,
      libraryList,
      dictList,
      categories
    );
  }
}
