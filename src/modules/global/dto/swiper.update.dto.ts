import { PartialType } from '@nestjs/swagger';
import { CreateSwiperDto } from './swiper.create.dto';

export class UpdateSwiperDto extends PartialType(CreateSwiperDto) {}
