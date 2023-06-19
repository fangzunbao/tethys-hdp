import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSwiperDto {
  @ApiProperty({ description: '主键Id' })
  id: string;

  @ApiProperty({ description: '轮播图地址' })
  @IsNotEmpty({ message: '轮播图地址不能为空' })
  readonly imageUrl: string;

  @ApiProperty({ description: '套餐或者菜品的Id' })
  @IsNotEmpty({ message: '套餐或者菜品的Id不能为空' })
  readonly groupId: string;

  @ApiProperty({ description: '身份码' })
  @IsNotEmpty({ message: '身份码不能为空' })
  readonly appId: string;

}
