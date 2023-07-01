import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Id' })
  @IsNotEmpty({ message: 'Id必填' })
  id: number;

  @ApiProperty({ description: '分类名' })
  @IsNotEmpty({ message: '分类名必填' })
  readonly name: string;

  @ApiProperty({ description: '父级分类' })
  @IsNotEmpty({ message: '父级分类必填' })
  readonly parent: number;

  @ApiProperty({ description: '分类备注' })
  readonly remark: string;
}
