import { Column, Entity } from 'typeorm';
import { Book } from './book.entity';

@Entity({
  name: 'reading_book',
  orderBy: {
    createTime: 'DESC',
  },
})
export class ReadingBook extends Book {
  @Column({
    type: 'date',
    comment: '添加时间',
  })
  addTime: Date;

  @Column({
    type: 'date',
    nullable: true,
    comment: '开始阅读时间',
  })
  startTime: Date;

  @Column({
    type: 'date',
    nullable: true,
    comment: '结束阅读时间',
  })
  endTime: Date;

  @Column({
    type: 'int',
    nullable: true,
    comment: '阅读时长',
  })
  duration: number;

  @Column({
    type: 'enum',
    enum: [0, 1, 2, 3],
    default: 0,
    comment: '阅读状态(0:未开始,1:阅读中,2:已完成,3:已中断)',
  })
  readingStatus: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '阅读者编号',
  })
  userId: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '对应书库图书编号',
  })
  libraryId: string;
}
