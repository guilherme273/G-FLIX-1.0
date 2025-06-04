import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { FavoritesController } from '../favorites.controller';
import { FavoritesService } from '../favorites.service';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';
import { findOneMockFavorites } from '../__mocks__/favoritesFindone';

describe('FavoritesController', () => {
  let controller: FavoritesController;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        {
          provide: FavoritesService,
          useValue: {
            createOrDelete: jest.fn().mockResolvedValue({
              msg: {
                type: 'success',
              },
            }),
            findAll: jest
              .fn()
              .mockResolvedValue({ favorites: [findOneMockFavorites] }),
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

    controller = moduleFixture.get<FavoritesController>(FavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a favorite register', async () => {
    const dto: CreateFavoriteDto = {
      id_movie: 1,
    };
    const result = await controller.create(dto, 1);
    expect(result.msg.type).toEqual('success');
  });

  it('should return all favorites', async () => {
    const result = await controller.findAll();
    expect(result?.favorites[0].id).toEqual(findOneMockFavorites.id);
  });
});
