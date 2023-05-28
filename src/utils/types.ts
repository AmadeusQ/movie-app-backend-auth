export type UpdateUserParams = {
  username: string;
  password: string;
};

export type CreateMovieParams = {
  title: string;
  description: string;
  releaseYear: number;
  movieUrl: string;
  moviePosterUrl: string;
};

export type UpdateMovieParams = {
  title: string;
  description: string;
  releaseYear: number;
  movieUrl: string;
  moviePosterUrl: string;
};

export type RegisterUserParams = {
  username: string;
  password: string;
};

export type SignInUserParams = {
  username: string;
  password: string;
};

export type MovieId = {
  movieId: number;
};
