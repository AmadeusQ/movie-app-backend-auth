import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from './Movie';
import { DefaultUser } from './DefaultUser';

@Entity({ name: 'ratings' })
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => DefaultUser, (user) => user.ratings)
  user: DefaultUser;

  @ManyToOne(() => Movie, (movie) => movie.ratings)
  movie: Movie;
}
