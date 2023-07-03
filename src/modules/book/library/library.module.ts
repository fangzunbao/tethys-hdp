import { LibraryBookService } from './library.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryBook } from '../entities/library.book.entity';
import { SystemModule } from 'src/modules/system/system.module';
import { CategoryModule } from 'src/modules/resource/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LibraryBook]),
    SystemModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [LibraryBookService],
  exports: [LibraryBookService],
})
export class LibraryBookModule {}
