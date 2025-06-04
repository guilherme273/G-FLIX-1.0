import { movieMock } from '../../movie/__mocks__/movieMockFindAll';

export const createMovieDto = {
  movieMock,
  msg: {
    type: 'success',
    content: `Filme: ${movieMock.title} cadastrado com sucesso!`,
  },
};
