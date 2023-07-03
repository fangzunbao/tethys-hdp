import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateBookDto } from './create.book.dto';

export class CreateLibraryBookDto extends PartialType(CreateBookDto) {

  @ApiProperty({ description: '出版方' })
  @IsNotEmpty({ message: '出版方必填' })
  readonly publisher: string;

  @ApiProperty({ description: '出版年' })
  @IsNotEmpty({ message: '出版年必填' })
  readonly publishYear: Date;

  @ApiProperty({ description: '奖项' })
  readonly awards: string;

  @ApiProperty({ description: '出品方' })
  readonly producer: string;

  @ApiProperty({ description: '页数' })
  readonly page: number;

  @ApiProperty({ description: '字数' })
  readonly word: string;

  @ApiProperty({ description: '定价' })
  @IsNotEmpty({ message: '定价必填' })
  readonly price: number;

  @ApiProperty({ description: '装帧' })
  readonly binding: string;

  @ApiProperty({ description: '丛书' })
  readonly serise: string;

  @ApiProperty({ description: '豆瓣评分' })
  @IsNotEmpty({ message: '豆瓣评分必填' })
  readonly grade: number;

  @ApiProperty({ description: '是否购买' })
  @IsNotEmpty({ message: '是否购买必填' })
  readonly buy: number;

  @ApiProperty({ description: '购买价格' })
  @IsNotEmpty({ message: '购买价格必填' })
  readonly buyPrice: number;

  @ApiProperty({ description: '购买时间' })
  @IsNotEmpty({ message: '购买时间必填' })
  readonly buyTime: Date;

  @ApiProperty({ description: '旗舰店' })
  readonly buyStore: string;

  @ApiProperty({ description: '购买平台' })
  readonly buyPlatform: string;

  @ApiProperty({ description: '活动' })
  readonly buyAcativy: string;

  @ApiProperty({ description: '快递公司' })
  readonly deliveryCompany: string;

  @ApiProperty({ description: '快递单号' })
  readonly deliveryId: string;

  @ApiProperty({ description: '支付方式' })
  readonly payWay: string;

  @ApiProperty({ description: '订单号' })
  readonly orderId: string;

  @ApiProperty({ description: '获取方式' })
  readonly getWay: string;
}
