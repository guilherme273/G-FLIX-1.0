import { MovieEntity } from 'src/movie/entities/movie.entity';

export const movieMockDeleteCategory = (
  overrides?: Partial<MovieEntity>,
): MovieEntity => ({
  id: 1,
  title: 'Aula 21',
  url: 'https://youtube.com',
  cover: 'https://image.jpg',
  category_id: 1,
  youtube_id: 'abc123',
  createdAt: new Date(),
  updatedAt: new Date(),
  reactions: [],
  favorites: [],
  views: [],
  category: {
    id: 1,
    name: 'G-FLIX-1.1',
    createdAt: new Date(),
    updatedAt: new Date(),
    movies: [],
  },
  reactionCounts: 1,
  ...overrides,
});

export const mockCategoriesdelete = {
  id: 1,
  name: 'G-FLIX-1.1',
  createdAt: new Date(),
  updatedAt: new Date(),
  movies: [movieMockDeleteCategory()],
};
