import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDictDto {
  @ApiProperty({ description: '主键Id' })
  id: string;

  @ApiProperty({ description: '字典名称' })
  @IsNotEmpty({ message: '字典名称必填' })
  name: string;

  @ApiProperty({ description: '字典值' })
  @IsNotEmpty({ message: '字典值必填' })
  readonly value: string;

  @ApiProperty({ description: '码表值' })
  @IsNotEmpty({ message: '码表值必填' })
  readonly code: string;

  @ApiProperty({ description: '拼音' })
  pinyin: string;

  @ApiProperty({ description: '备注' })
  readonly remark: string;
}
