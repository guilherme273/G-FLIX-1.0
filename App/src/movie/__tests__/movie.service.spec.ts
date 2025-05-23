import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MovieService } from '../movie.service';
import { MovieEntity } from '../entities/movie.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { ReactionsEntity } from '../../reactions/entities/reaction.entity';
import { mockCategories, mockRawCounts } from '../__mocks__/movieMockFindAll';

describe('MovieService', () => {
  let service: MovieService;
  let categoryRepository: Repository<CategoryEntity>;
  let reactionsRepository: Repository<ReactionsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ReactionsEntity),
          useValue: {
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
    reactionsRepository = module.get<Repository<ReactionsEntity>>(
      getRepositoryToken(ReactionsEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return movies with reactionCounts', async () => {
    (categoryRepository.find as jest.Mock).mockResolvedValue(mockCategories);

    const getRawManyMock = jest.fn().mockResolvedValue(mockRawCounts);
    const mockQueryBuilder = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      addGroupBy: jest.fn().mockReturnThis(),
      getRawMany: getRawManyMock,
    };
    (reactionsRepository.createQueryBuilder as jest.Mock).mockReturnValue(
      mockQueryBuilder,
    );

    const result = await service.findAll();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(categoryRepository.find).toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(reactionsRepository.createQueryBuilder).toHaveBeenCalled();
    expect(result).toEqual({
      movies: [
        {
          ...mockCategories[0],
          movies: [
            {
              ...mockCategories[0].movies[0],
              reactionCounts: {
                4: 1,
              },
            },
          ],
        },
      ],
    });
  });
});
