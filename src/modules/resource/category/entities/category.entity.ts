import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'book_category',
  orderBy: {
    id: 'ASC',
  },
})
export class Category {
  @PrimaryColumn({ type: 'int', comment: 'Id值' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '分类名',
  })
  name: string;

  @Column({
    type: 'int',
    comment: '父级Id',
  })
  parent: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '分类备注',
  })
  remark: string;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 1,
    comment: '分类状态 是否启用(1:启用, 0:停用)',
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
