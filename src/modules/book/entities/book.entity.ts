import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Book {
  @PrimaryColumn({ type: 'varchar', length: 20, comment: 'ID值' })
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '图书名称',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '图书作者',
  })
  author: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '图书译者',
  })
  translator: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '图书ISBN',
  })
  isbn: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '图书封面',
  })
  cover: string;

  @Column({
    type: 'varchar',
    length: 10,
    comment: '图书格式',
  })
  format: string;

  @Column({
    type: 'varchar',
    length: 10,
    comment: '图书篇幅',
  })
  space: string;

  @Column({
    type: 'varchar',
    length: 10,
    comment: '文学类型',
  })
  nation: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '图书分类',
  })
  category: number;

  @Column('simple-array', { nullable: true, comment: '图书标签' })
  tag: string[];

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '图书备注',
  })
  remark: string;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 1,
    comment: '图书状态 是否启用(1:启用, 0:停用)',
  })
  status: number;

  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: '修改时间',
  })
  updateTime: Date;
}
