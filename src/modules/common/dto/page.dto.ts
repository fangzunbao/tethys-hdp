import { ApiProperty } from '@nestjs/swagger';

export class PageDto {
  @ApiProperty({ description: '页码' })
  pageNum: number;

  @ApiProperty({ description: '页数' })
  pageSize: number;
}
