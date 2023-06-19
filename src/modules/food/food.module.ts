import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { FoodMaterial } from './entities/foodMaterial.entity';
import { FoodService } from './food.service';

@Module({
  imports: [TypeOrmModule.forFeature([Food, FoodMaterial])],
  controllers: [],
  providers: [FoodService],
  exports: [FoodService],
})
export class FoodModule {}
