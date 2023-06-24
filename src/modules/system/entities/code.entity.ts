import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'system_code',
})
export class SystemCode {
  @PrimaryColumn({ type: 'varchar', length: 20, comment: 'ID' })
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 20,
    comment: '码表名称',
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 50,
    comment: '码表值',
  })
  value: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '汉语拼音',
  })
  pinyin: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '备注',
  })
  remark: string;

  @Column({
    type: 'enum',
    enum: [0, 1],
    default: 1,
    comment: '码表状态 是否启用(1:启用, 0:停用)',
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

  @Column({
    type: 'varchar',
    length: 50,
    default: null,
    comment: '父级Id',
  })
  parent: string;
}
