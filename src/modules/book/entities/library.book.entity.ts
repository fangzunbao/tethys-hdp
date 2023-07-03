import {
  Column,
  Entity,
} from 'typeorm';
import { Book } from './book.entity';

@Entity({
  name: 'library_book',
  orderBy: {
    createTime: 'DESC',
  },
})
export class LibraryBook extends Book {
  @Column({
    type: 'varchar',
    length: 20,
    comment: '出版方',
  })
  publisher: string;

  @Column({
    type: 'date',
    comment: '出版年',
  })
  publishYear: Date;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '奖项',
  })
  awards: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '出品方',
  })
  producer: string;

  @Column({
    type: 'int',
    nullable: true,
    comment: '页数',
  })
  page: number;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '字数',
  })
  word: string;

  @Column({
    type: 'double',
    comment: '定价',
  })
  price: number;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '装帧',
  })
  binding: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '丛书',
  })
  serise: string;

  @Column({
    type: 'double',
    comment: '豆瓣评分',
  })
  grade: number;

  @Column({
    type: 'enum',
    enum: [0, 1],
    comment: '是否购买(1:是, 0:否)',
  })
  buy: number;

  @Column({
    type: 'double',
    comment: '购买价格',
  })
  buyPrice: number;

  @Column({
    type: 'date',
    comment: '购买时间',
  })
  buyTime: Date;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '旗舰店',
  })
  buyStore: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '购买平台',
  })
  buyPlatform: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    comment: '活动',
  })
  buyAcativy: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '快递公司',
  })
  deliveryCompany: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    comment: '快递单号',
  })
  deliveryId: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    comment: '支付方式',
  })
  payWay: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    comment: '订单号',
  })
  orderId: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: '获取方式',
  })
  getWay: string;
}
