import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Movie } from './Movie';
import { DefaultUser } from './DefaultUser';

@Entity({ name: 'favoritelists' })
export class Favoritelist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  movieId: number;

  @ManyToOne(() => DefaultUser, (user) => user.favoritelists)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: DefaultUser;

  @ManyToOne(() => Movie, (movie) => movie.favoritelists)
  @JoinColumn({ name: 'movieId', referencedColumnName: 'movieId' })
  movie: Movie;
}
