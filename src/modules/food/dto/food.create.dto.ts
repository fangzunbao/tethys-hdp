import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFoodDto {
  @ApiProperty({ description: '主键Id' })
  id: string;

  @ApiProperty({ description: '菜品名称' })
  @IsNotEmpty({ message: '菜品名称不能为空' })
  readonly foodName: string;

  @ApiProperty({ description: '菜品描述' })
  @IsNotEmpty({ message: '菜品描述不能为空' })
  readonly foodDesc: string;

  @ApiProperty({ description: '烹饪时间' })
  @IsNotEmpty({ message: '烹饪时间不能为空' })
  readonly cookingTime: string;

  @ApiProperty({ description: '制作难度' })
  @IsNotEmpty({ message: '制作难度不能为空' })
  readonly difficulty: number;

  @ApiProperty({ description: '适宜人群' })
  @IsNotEmpty({ message: '适宜人群不能为空' })
  readonly suitable: string;

  @ApiProperty({ description: '食用方式' })
  @IsNotEmpty({ message: '食用方式不能为空' })
  readonly edibleWay: string;

  @ApiProperty({ description: '做法' })
  @IsNotEmpty({ message: '做法不能为空' })
  readonly operateWay: string;

  @ApiProperty({ description: '操作步骤' })
  @IsNotEmpty({ message: '操作步骤不能为空' })
  readonly procedure: string;
}
