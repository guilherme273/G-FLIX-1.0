import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewService } from '../view.service';
import { ViewEntity } from '../entities/view.entity';
import { viewEntityMock } from '../__moks/viewEntityMock';

describe('ViewService', () => {
  let service: ViewService;
  let viewRepository: Repository<ViewEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViewService,
        {
          provide: getRepositoryToken(ViewEntity),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ViewService>(ViewService);
    viewRepository = module.get<Repository<ViewEntity>>(
      getRepositoryToken(ViewEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sould create a new view', async () => {
    jest.spyOn(viewRepository, 'save').mockResolvedValueOnce(viewEntityMock());
    const dto = {
      id_movie: viewEntityMock().id_movie,
      seconds_watched: viewEntityMock().seconds_watched,
    };
    const result = await service.create(dto, viewEntityMock().id_user);
    expect(result.view.id).toEqual(viewEntityMock().id);
  });
});
