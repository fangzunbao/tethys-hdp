import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swiper } from './entities/swiper.entity';
import { GlobalService } from './global.service';

@Module({
  imports: [TypeOrmModule.forFeature([Swiper])],
  controllers: [],
  providers: [GlobalService],
  exports: [GlobalService],
})
export class GlobalModule {}
