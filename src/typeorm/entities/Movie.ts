import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Genre } from './Genre';
import { Actor } from './Actor';
import { Watchlist } from './Watchlist';
import { Watchedlist } from './Watchedlist';
import { Favoritelist } from './Favoritelist';
import { Rating } from './Rating';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  movieId: number;

  @Column()
  title: string;

  @Column({ length: 2000 })
  description: string;

  @Column()
  releaseYear: number;

  @Column({ length: 1000 })
  movieUrl: string;

  @Column({ length: 1000 })
  moviePosterUrl: string;

  @Column()
  duration: number;

  @ManyToMany(() => Genre, (genre) => genre.movies, { cascade: true })
  @JoinTable({
    name: 'moviegenres',
    joinColumn: { name: 'movieId', referencedColumnName: 'movieId' },
    inverseJoinColumn: { name: 'genreId', referencedColumnName: 'genreId' },
  })
  genres: Genre[];

  @ManyToMany(() => Actor, (actor) => actor.movies, { cascade: true })
  @JoinTable({
    name: 'movieactors',
    joinColumn: { name: 'movieId', referencedColumnName: 'movieId' },
    inverseJoinColumn: { name: 'actorId', referencedColumnName: 'actorId' },
  })
  actors: Actor[];

  @OneToMany(() => Watchlist, (watchlist) => watchlist.movie, {
    cascade: true,
  })
  watchlists: Watchlist[];

  @OneToMany(() => Watchedlist, (watchedlist) => watchedlist.movie, {
    cascade: true,
  })
  watchedlists: Watchedlist[];

  @OneToMany(() => Favoritelist, (favoritelist) => favoritelist.movie, {
    cascade: true,
  })
  favoritelists: Favoritelist[];

  @OneToMany(() => Rating, (rating) => rating.movie)
  ratings: Rating[];
}
