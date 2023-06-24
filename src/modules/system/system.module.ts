import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemCode } from './entities/code.entity';
import { SystemDict } from './entities/dict.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemCode, SystemDict])],
  controllers: [],
  providers: [SystemService],
  exports: [SystemService],
})
export class SystemModule {}
