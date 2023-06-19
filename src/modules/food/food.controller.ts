import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RbacGuard } from 'src/guards/rbac.guard';
import { AuthGuard } from '@nestjs/passport';
import { useDefaultUserConfig } from '../../config/roles';
import { FoodService } from './food.service';
import { CreateFoodMaterialDto } from './dto/foodMaterial.create.dto';

const { ROLE_LIST } = useDefaultUserConfig();

@ApiBearerAuth() // Swagger 的 JWT 验证
@Controller('food')
@ApiTags('菜品操作详情')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ApiOperation({ summary: '新添加一条菜品数据' })
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Post('/create-food')
  @UseInterceptors()
  createFood(@Body() body) {}

  @ApiOperation({ summary: '新添加一条用料数据' })
  @UseGuards(new RbacGuard(ROLE_LIST.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @Post('/create-food-material')
  createFoodMaterial(@Body() body: CreateFoodMaterialDto) {
    return this.foodService.createFoodMaterial(body);
  }
}
