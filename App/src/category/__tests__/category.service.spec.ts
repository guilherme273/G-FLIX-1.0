import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from '../category.service';
import { CategoryEntity } from '../entities/category.entity';
import { findAllCategoryMock } from '../__mocks__/categoryFindall';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all categories', async () => {
    jest
      .spyOn(categoryRepository, 'find')
      .mockResolvedValueOnce(findAllCategoryMock);
    const result = await service.findAll();
    expect(result?.categories).toEqual(findAllCategoryMock);
  });
});
