import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Watchlist } from './Watchlist';
import { Watchedlist } from './Watchedlist';
import { Favoritelist } from './Favoritelist';
import { Rating } from './Rating';
import { Token } from './Token';

@Entity({ name: 'users' })
export class DefaultUser {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
  watchlists: Watchlist[];

  @OneToMany(() => Watchedlist, (watchedlist) => watchedlist.user)
  watchedlists: Watchedlist[];

  @OneToMany(() => Favoritelist, (favoritelist) => favoritelist.user)
  favoritelists: Favoritelist[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Token, (token) => token.user, {
    cascade: true,
  })
  tokens: Token[];
}
