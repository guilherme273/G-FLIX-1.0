import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { MovieController } from '../movie.controller';
import { MovieService } from '../movie.service';
import { mockCategories } from '../__mocks__/movieMockFindAll';

describe('MovieController', () => {
  let controller: MovieController;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: {
            findAll: jest.fn().mockResolvedValue({ movies: [mockCategories] }),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        canActivate: (context: ExecutionContext) => true,
      })
      .compile();

    controller = moduleFixture.get<MovieController>(MovieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all movies', async () => {
    const result = await controller.findAll();
    expect(result.movies.length).toEqual(1);
  });
});
