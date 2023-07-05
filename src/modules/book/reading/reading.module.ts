import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingBookService } from './reading.service';
import { ReadingBook } from '../entities/reading.book.entity';
import { SystemModule } from 'src/modules/system/system.module';
import { CategoryModule } from 'src/modules/resource/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReadingBook]),
    SystemModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [ReadingBookService],
  exports: [ReadingBookService],
})
export class ReadingBookModule {}
