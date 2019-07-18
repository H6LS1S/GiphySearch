import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { History } from '../history/history.entity';
import { Users } from '../users/users.entity';

@Entity('Likes')
@Index(['user', 'image'], { unique: true })
export class Likes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
    unique: false,
    name: 'image',
  })
  image: string;

  @ManyToOne(_type => Users, users => users.likes, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: Users;

  @ManyToOne(_type => History, history => history.user, {
    nullable: true,
  })
  history: History;

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
