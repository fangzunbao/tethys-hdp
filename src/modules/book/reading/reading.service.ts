import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { createUniqueId, reFormatArray } from 'src/utils/util';
import { UpdateLibraryBookDto } from '../dto/update.library.book.dto';
import { PageDto } from 'src/modules/common/dto/page.dto';
import { QueryBookDto } from '../dto/query.book.dto';
import { BasePage } from 'src/modules/common/dto/entities/baseInfo.entity';
import { ReadingBook } from '../entities/reading.book.entity';
import { CreateReadingBookDto } from '../dto/create.reading.book.dto';
import { CategoryService } from 'src/modules/resource/category/category.service';
import { SystemService } from 'src/modules/system/system.service';

@Injectable()
export class ReadingBookService {
  constructor(
    @InjectRepository(ReadingBook)
    private readingBookRepository: Repository<ReadingBook>,
    private readonly systemService: SystemService,
    private readonly categoryService: CategoryService,
  ) {}

  async createReadingBook(body: CreateReadingBookDto) {
    body.id = createUniqueId();
    return await this.readingBookRepository.save(body);
  }

  async findReadingBookById(id: string) {
    return await this.readingBookRepository.findOne({
      where: { id },
      cache: true,
    });
  }

  async updateReadingBook(update: UpdateLibraryBookDto) {
    return await this.readingBookRepository.update(update.id, update);
  }

  async removeReadingBookList(id: string[]) {
    return await this.readingBookRepository.delete(id);
  }

  async pageQueryFind(page: PageDto, query: QueryBookDto) {
    const libraryList = await this.readingBookRepository.find({
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
        ...(query.readingStatus !== -1 && {
          readingStatus: query.readingStatus,
        }),
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
    const total = await this.readingBookRepository.count({
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
        ...(query.readingStatus !== -1 && {
          readingStatus: query.readingStatus,
        }),
        ...(query.startTime && {
          createTime: MoreThanOrEqual(new Date(query.startTime)),
        }),
        ...(query.endTime && {
          createTime: LessThanOrEqual(new Date(query.endTime)),
        }),
      },
    });

    const dictList = reFormatArray(await this.systemService.findDictByCode());

    const categories = await this.categoryService.findCategoryTree();

    return new BasePage(
      page.pageNum,
      page.pageSize,
      total,
      libraryList,
      dictList,
      categories,
    );
  }
}
