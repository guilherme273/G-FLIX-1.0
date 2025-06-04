import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { findAllCategoryMock } from '../__mocks__/categoryFindall';

describe('CategoryController', () => {
  let controller: CategoryController;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue({ categories: findAllCategoryMock }),
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

    controller = moduleFixture.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all categories', async () => {
    const result = await controller.findAll();
    expect(result?.categories[0].id).toEqual(findAllCategoryMock[0].id);
  });
});
