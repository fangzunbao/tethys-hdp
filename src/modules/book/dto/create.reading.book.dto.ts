import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateBookDto } from './create.book.dto';

export class CreateReadingBookDto extends PartialType(CreateBookDto) {

  @ApiProperty({ description: '开始阅读时间' })
  readonly startTime: Date;

  @ApiProperty({ description: '结束阅读时间' })
  readonly endTime: Date;

  @ApiProperty({ description: '阅读时长' })
  readonly duration: number;

  @ApiProperty({ description: '阅读状态' })
  readonly readingStatus: number;

  @ApiProperty({ description: '阅读者编号' })
  @IsNotEmpty({ message: '阅读者编号必填' })
  readonly userId: string;

  @ApiProperty({ description: '对应书库图书编号' })
  @IsNotEmpty({ message: '对应书库图书编号必填' })
  readonly libraryId: string;
}
