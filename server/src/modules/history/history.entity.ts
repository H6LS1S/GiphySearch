import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Users } from '../users/users.entity';
import { Likes } from '../likes/likes.entity';

@Entity('History')
export class History extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
    unique: false,
    name: 'tag',
  })
  tag: string;

  @ManyToOne(_type => Users, users => users.history, {
    nullable: false,
  })
  user: Users;

  @OneToMany(_type => Likes, likes => likes.history, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'likes' })
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
