import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { FavoritesService } from '../favorites.service';
import { FavoritesEntity } from '../entities/favorite.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';

import { findOneMockFavorites } from '../__mocks__/favoritesFindone';
import { deleteResultMock } from 'src/reactions/__mocks__/reactionsDelete';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let favoritesRepository: Repository<FavoritesEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: getRepositoryToken(FavoritesEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    favoritesRepository = module.get<Repository<FavoritesEntity>>(
      getRepositoryToken(FavoritesEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a favorite register', async () => {
    const dto: CreateFavoriteDto = { id_movie: 1 };
    jest.spyOn(favoritesRepository, 'findOne').mockResolvedValueOnce(null);
    const result = await service.createOrDelete(dto, 1);
    expect(result.msg).toEqual({
      type: 'success',
      content: 'Filme adicionado aos favoritos!',
    });
  });

  it('should revome a favorite register', async () => {
    const dto: CreateFavoriteDto = { id_movie: 1 };
    jest
      .spyOn(favoritesRepository, 'findOne')
      .mockResolvedValueOnce(findOneMockFavorites);
    jest
      .spyOn(favoritesRepository, 'delete')
      .mockResolvedValueOnce(deleteResultMock);
    const result = await service.createOrDelete(dto, 1);
    expect(result.msg).toEqual({
      type: 'success',
      content: 'Filme removido dos favoritos!',
    });
  });
});
