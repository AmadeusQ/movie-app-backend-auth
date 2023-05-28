import { DefaultUser } from './DefaultUser';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'tokens' })
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  token: string;

  @ManyToOne(() => DefaultUser, (user) => user.tokens)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: DefaultUser;
}
