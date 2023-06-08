import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Swiper } from './entities/swiper.entity';
import { Repository } from 'typeorm';
import { CreateSwiperDto } from './dto/swiper.create.dto';
import { createUniqueId } from 'src/utils/util';
import { UpdateSwiperDto } from './dto/swiper.update.dto';

@Injectable()
export class GlobalService {
  constructor(
    @InjectRepository(Swiper) private swiperRepository: Repository<Swiper>,
  ) {}

  createSwiperItem(body: CreateSwiperDto) {
    body.id = createUniqueId();
    return this.swiperRepository.save(body);
  }

  async findAllSwiperItem(appId: string) {
    return await this.swiperRepository.find({ where: { appId } });
  }

  updateSwiperItem(body: UpdateSwiperDto) {
    return this.swiperRepository.update(body.id, body);
  }

  removeSwiperItem(id: string) {
    return this.swiperRepository.delete(id);
  }

  removeSwiperItems(ids: string[]) {
    return this.swiperRepository.delete(ids);
  }
}
