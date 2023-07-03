import { ApiProperty } from '@nestjs/swagger';

export class QueryBookDto {
  @ApiProperty({ description: '图书标题/作者/译者/ISBN/ID值' })
  keyword: string;

  @ApiProperty({ description: '格式' })
  format: string;

  @ApiProperty({ description: '篇幅' })
  space: string;

  @ApiProperty({ description: '文学类型' })
  nation: string;

  @ApiProperty({ description: '图书类型' })
  category: number;

  @ApiProperty({ description: '状态' })
  status: number;

  @ApiProperty({ description: '开始时间' })
  startTime: string;

  @ApiProperty({ description: '结束时间' })
  endTime: string;

  @ApiProperty({ description: '出版方' })
  publisher: string;

  @ApiProperty({ description: '是否购买' })
  buy: number;

  @ApiProperty({ description: '旗舰店' })
  buyStore: string;

  @ApiProperty({ description: '购买平台' })
  buyPlatform: string;

  @ApiProperty({ description: '快递公司' })
  deliveryCompany: string;

  @ApiProperty({ description: '支付方式' })
  payWay: string;

  @ApiProperty({ description: '阅读状态' })
  readingStatus: number;

  @ApiProperty({ description: '获取方式' })
  getWay: string;
}
