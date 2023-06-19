import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Food } from "./entities/food.entity";
import { Repository } from "typeorm";
import { createUniqueId } from "src/utils/util";
import { FoodMaterial } from "./entities/foodMaterial.entity";
import { CreateFoodMaterialDto } from "./dto/foodMaterial.create.dto";

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>,
    @InjectRepository(FoodMaterial) private foodMaterialRepository: Repository<FoodMaterial>,
  ) {}


  createFood(createFoodDto) {
    createFoodDto.id = createUniqueId();
    return this.foodRepository.save(createFoodDto);
  }

  async createFoodMaterial(body:CreateFoodMaterialDto){
    body.id = createUniqueId()
    return this.foodMaterialRepository.save(body)
  }
  
}
