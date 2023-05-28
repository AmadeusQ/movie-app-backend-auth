import { Movie } from './Movie';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity({ name: 'actors' })
export class Actor {
  @PrimaryGeneratedColumn()
  actorId: number;

  @Column()
  actorName: string;

  constructor(actorId: number, actorName: string) {
    this.actorId = actorId;
    this.actorName = actorName;
  }

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];
}
