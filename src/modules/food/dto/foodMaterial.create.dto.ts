import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFoodMaterialDto {
  @ApiProperty({ description: '主键Id' })
  id: string;

  @ApiProperty({ description: '用料名称' })
  @IsNotEmpty({ message: '用料名称不能为空' })
  readonly materialName: string;

  @ApiProperty({ description: '用量' })
  @IsNotEmpty({ message: '用量不能为空' })
  readonly dosage: string;

  @ApiProperty({ description: '其他用量' })
  @IsNotEmpty({ message: '其他用量不能为空' })
  readonly otherDosage: string;

  @ApiProperty({ description: '分类' })
  @IsNotEmpty({ message: '分类不能为空' })
  readonly category: string;

}
