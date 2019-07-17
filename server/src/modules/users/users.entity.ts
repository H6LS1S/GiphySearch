import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { History } from '../history/history.entity';
import { Likes } from '../likes/likes.entity';

@Entity('Users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
    unique: true,
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    nullable: false,
    unique: true,
    name: 'password',
  })
  password: string;

  @OneToMany(_type => History, history => history.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'history' })
  history: History[];

  @OneToMany(_type => Likes, likes => likes.user, {
    nullable: true,
    cascade: true,
  })
  likes: Likes[];

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'createAt',
  })
  createAt: Date;

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updateAt',
  })
  updateAt: Date;
}
