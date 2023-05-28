import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Movie } from './Movie';
import { DefaultUser } from './DefaultUser';

@Entity({ name: 'watchlists' })
export class Watchlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  movieId: number;

  @ManyToOne(() => DefaultUser, (user) => user.watchlists)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: DefaultUser;

  @ManyToOne(() => Movie, (movie) => movie.watchlists)
  @JoinColumn({ name: 'movieId', referencedColumnName: 'movieId' })
  movie: Movie;
}
