import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingBookService } from './reading.service';
import { ReadingBook } from '../entities/reading.book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReadingBook])],
  controllers: [],
  providers: [ReadingBookService],
  exports: [ReadingBookService],
})
export class ReadingBookModule {}
