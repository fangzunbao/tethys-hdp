import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Id' })
  @IsNotEmpty({ message: 'Id必填' })
  id: string;

  @ApiProperty({ description: '图书名称' })
  @IsNotEmpty({ message: '图书名称必填' })
  readonly title: string;

  @ApiProperty({ description: '图书作者' })
  @IsNotEmpty({ message: '图书作者必填' })
  readonly author: string;

  @ApiProperty({ description: '图书译者' })
  readonly translator: string;

  @ApiProperty({ description: '图书ISBN' })
  @IsNotEmpty({ message: '图书ISBN必填' })
  readonly isbn: string;

  @ApiProperty({ description: '图书封面' })
  readonly cover: string;

  @ApiProperty({ description: '图书格式' })
  @IsNotEmpty({ message: '图书格式必填' })
  readonly format: string;

  @ApiProperty({ description: '图书篇幅' })
  @IsNotEmpty({ message: '图书篇幅必填' })
  readonly space: string;

  @ApiProperty({ description: '文学类型' })
  @IsNotEmpty({ message: '文学类型必填' })
  readonly nation: string;

  @ApiProperty({ description: '图书类型' })
  @IsNotEmpty({ message: '图书类型必填' })
  readonly category: number;

  @ApiProperty({ description: '图书标签' })
  readonly tag: string[];

  @ApiProperty({ description: '图书备注' })
  readonly remark: string;
}
