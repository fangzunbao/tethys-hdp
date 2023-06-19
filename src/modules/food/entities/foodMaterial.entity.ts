import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'food_material',
})
export class FoodMaterial {
  @PrimaryColumn({ type: 'varchar', length: 20, comment: 'id' })
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '用料名称',
  })
  materialName: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '用量',
  })
  dosage: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '其他用量',
  })
  otherDosage: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '分类',
  })
  category: string;


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
