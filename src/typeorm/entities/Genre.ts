import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from './Movie';

@Entity({ name: 'genres' })
export class Genre {
  @PrimaryGeneratedColumn()
  genreId: string;

  @Column()
  genreName: string;

  @ManyToMany(() => Movie, (movie) => movie.genres)
  movies: Movie[];
}
