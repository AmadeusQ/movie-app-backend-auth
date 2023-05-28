import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Movie } from './Movie';
import { DefaultUser } from './DefaultUser';

@Entity({ name: 'watchedlists' })
export class Watchedlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  movieId: number;

  @ManyToOne(() => DefaultUser, (user) => user.watchedlists)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: DefaultUser;

  @ManyToOne(() => Movie, (movie) => movie.watchedlists)
  @JoinColumn({ name: 'movieId', referencedColumnName: 'movieId' })
  movie: Movie;
}
