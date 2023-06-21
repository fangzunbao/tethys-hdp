import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({
  name: 'user_other_account',
})
export class UserOtherAccount {
  @PrimaryColumn({ type: 'varchar', length: 20, comment: 'ID' })
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '账号名称',
  })
  label: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '账号链接',
  })
  value: string;

  @ManyToOne(() => User, (user) => user.otherAccount)
  user: User;
}
