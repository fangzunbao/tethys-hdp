import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCodeDto {
  @ApiProperty({ description: '主键Id' })
  id: string;

  @ApiProperty({ description: '码表名称' })
  @IsNotEmpty({ message: '码表名称必填' })
  name: string;

  @ApiProperty({ description: '码表值' })
  @IsNotEmpty({ message: '码表值必填' })
  value: string;

  @ApiProperty({ description: '拼音' })
  pinyin: string;

  @ApiProperty({ description: '备注' })
  remark: string;

  @ApiProperty({ description: '父级' })
  parent: string;
}
