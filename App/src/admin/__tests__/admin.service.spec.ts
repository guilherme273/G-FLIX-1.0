import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { AdminService } from '../admin.service';
import { MovieEntity } from '../../movie/entities/movie.entity';
import { FavoritesEntity } from '../../favorites/entities/favorite.entity';
import { ReactionsEntity } from '../../reactions/entities/reaction.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { ViewEntity } from '../../view/entities/view.entity';
import { HttpService } from '@nestjs/axios';
import {
  categoryFindMock,
  viewsPerCategoryMock,
} from '../__mocks__/categoryFindMock';
import { viewEntityMock } from '../../view/__moks/viewEntityMock';

describe('AdminService', () => {
  let service: AdminService;
  let userRepository: Repository<UserEntity>;
  let movieRepository: Repository<MovieEntity>;
  let favoritesRepository: Repository<FavoritesEntity>;
  let reactionsRepository: Repository<ReactionsEntity>;
  let categoryRepository: Repository<CategoryEntity>;
  let viewsRepository: Repository<ViewEntity>;
  let dataSource: DataSource;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(FavoritesEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(ReactionsEntity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ViewEntity),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: DataSource, // Mock do DataSource
          useValue: {
            transaction: jest.fn(),
          },
        },
        {
          provide: HttpService, // Mock do HttpService
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    dataSource = module.get<DataSource>(DataSource);
    httpService = module.get<HttpService>(HttpService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    movieRepository = module.get<Repository<MovieEntity>>(
      getRepositoryToken(MovieEntity),
    );
    favoritesRepository = module.get<Repository<FavoritesEntity>>(
      getRepositoryToken(FavoritesEntity),
    );
    reactionsRepository = module.get<Repository<ReactionsEntity>>(
      getRepositoryToken(ReactionsEntity),
    );
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
    viewsRepository = module.get<Repository<ViewEntity>>(
      getRepositoryToken(ViewEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should extractYouTubeID on correct format', () => {
    const url = 'https://www.youtube.com/watch?v=T-2OnaS-yZw&t=4919s';
    const result = service.extractYouTubeID(url);
    expect(result).toEqual('T-2OnaS-yZw');
  });

  it('should return the categories with yours movies', async () => {
    jest
      .spyOn(categoryRepository, 'find')
      .mockResolvedValueOnce(categoryFindMock);

    const result = await service.getCategories();
    expect(result?.categories).toEqual(categoryFindMock);
  });

  it('should return views by category, seconds watched by category, and minutes watched by day', async () => {
    const arrayView = [viewEntityMock()];
    jest
      .spyOn(categoryRepository, 'find')
      .mockResolvedValueOnce(categoryFindMock);
    jest.spyOn(viewsRepository, 'find').mockResolvedValueOnce(arrayView);

    const result = await service.getViews();
    const viewDate = new Date();
    const day = viewDate.toLocaleDateString('pt-BR');

    expect(result.minutesForDay).toEqual([{ name: day, value: 2 }]);
    expect(result.secondsWatchedPerCategory).toEqual([
      {
        name: 'Ação',
        value: 45,
      },
      {
        name: 'Terror',
        value: 55,
      },
    ]);
    expect(result.viewsPerCategory).toEqual([
      {
        name: 'Ação',
        value: 1,
      },
      {
        name: 'Terror',
        value: 2,
      },
    ]);
  });
});
