import { categorymock } from '../../category/__mocks__/categoryFindall';
import { findOneMockFavorites } from '../../favorites/__mocks__/favoritesFindone';
import { movieMock } from '../../movie/__mocks__/movieMockFindAll';
import { ReactionsEntityMock } from '../../reactions/__mocks__/ReactionsEntityMock';
import { viewEntityMock } from '../../view/__moks/viewEntityMock';

export const getMovieMock = {
  movies: [movieMock],
  moviesPerCategory: [
    {
      name: 'Ação',
      value: 2,
    },
  ],
  top10MostViewed: [
    {
      totalSecondsWatched: 5,
      id: 1,
      title: 'string',
      url: 'string',
      cover: 'string',
      category_id: 1,
      youtube_id: 'string',
      createdAt: new Date(),
      updatedAt: new Date(),
      category: categorymock,
      reactions: [ReactionsEntityMock()],
      reactionCounts: 1,
      favorites: [findOneMockFavorites],
      views: [viewEntityMock()],
    },
  ],
  top10MostWatched: [
    {
      viewsCount: 1,
      id: 1,
      title: 'string',
      url: 'string',
      cover: 'string',
      category_id: 1,
      youtube_id: 'string',
      createdAt: new Date(),
      updatedAt: new Date(),
      category: categorymock,
      reactions: [ReactionsEntityMock()],
      reactionCounts: 1,
      favorites: [findOneMockFavorites],
      views: [viewEntityMock()],
    },
  ],
};
