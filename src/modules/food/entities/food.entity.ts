import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { FoodMaterial } from './foodMaterial.entity';
import { Swiper } from 'src/modules/global/entities/swiper.entity';

@Entity({
  name: 'food',
  orderBy: {
    createTime: 'DESC',
  },
})
export class Food {
  @PrimaryColumn({ type: 'varchar', length: 20, comment: 'Id' })
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '菜品名称',
  })
  foodName: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '菜品描述',
  })
  foodDesc: string;

  @OneToMany(() => Swiper, (swiper) => swiper.groupId)
  foodImg: Swiper[];

  @Column({
    type: 'varchar',
    length: 50,
    comment: '烹饪时间',
  })
  cookingTime: string;

  @Column({
    type: 'tinyint',
    precision: 1,
    comment: '制作难度(1:简单, 2:中等, 3:困难)',
  })
  difficulty: number;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '适宜人群',
  })
  suitable: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '食用方式',
  })
  edibleWay: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '做法',
  })
  operateWay: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '操作步骤',
  })
  procedure: string;

  @ManyToMany(() => FoodMaterial)
  material: FoodMaterial[];

  @Column({
    type: 'tinyint',
    precision: 1,
    default: 1,
    comment: '状态 是否启用(1:启用, 0:停用)',
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
