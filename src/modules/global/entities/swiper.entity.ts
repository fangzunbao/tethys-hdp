import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'swiper',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Swiper {
  @PrimaryColumn({ type: 'varchar', length: 20, comment: '轮播图Id' })
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '轮播图地址',
  })
  imageUrl: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '轮播图对应的套餐或菜品Id',
  })
  groupId: string;

  @Column({
    type: 'tinyint',
    precision: 1,
    default: 1,
    comment: '状态 是否启用(1:启用, 0:停用)',
  })
  status: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
    comment: '身份码',
  })
  appId: string;

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
