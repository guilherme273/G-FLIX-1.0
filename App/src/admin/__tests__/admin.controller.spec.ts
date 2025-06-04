import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AdminController } from '../admin.controller';
import { AdminService } from '../admin.service';
import { AdminGuard } from '../adminGuard';
import { getUsersMock } from '../__mocks__/getUsersControllerMock';
import { getMovieMock } from '../__mocks__/getMoviesControllerMock';
import { getViewsMock } from '../__mocks__/getViewscontrollerMock';
import { getCategoriesMock } from '../__mocks__/getCategoriesControllerMock';
import { CreateCategoryDto } from '../../category/dto/create-category.dto';
import { createCategory } from '../__mocks__/createCategoryController';
import { GetMovieYoutubeDto } from '../../movie/dto/create-movie.dto';
import { createMovieDto } from '../__mocks__/createMoviewControllerMock';
import { overviewMock } from '../__mocks__/overviewControllerMok';

describe('AdminController', () => {
  let controller: AdminController;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            overview: jest.fn().mockResolvedValue(overviewMock),
            getUsers: jest.fn().mockResolvedValue(getUsersMock),
            getMovies: jest.fn().mockResolvedValue(getMovieMock),
            getViews: jest.fn().mockResolvedValue(getViewsMock),
            getCategories: jest.fn().mockResolvedValue(getCategoriesMock),
            createCategory: jest.fn().mockResolvedValue(createCategory),
            createMovie: jest.fn().mockResolvedValue(createMovieDto),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        canActivate: (context: ExecutionContext) => true,
      })
      .overrideGuard(AdminGuard)
      .useValue({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        canActivate: (context: ExecutionContext) => true,
      })
      .compile();

    controller = moduleFixture.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('shold return true  when is admin ', () => {
    const result = controller.getProfile();
    expect(result).toEqual(true);
  });

  it('should return data of overview page', async () => {
    const result = await controller.getOverview();
    expect(result).toEqual(overviewMock);
  });

  it('should return data of users', async () => {
    const result = await controller.getUsers();
    expect(result).toEqual(getUsersMock);
  });

  it('should return data of movies', async () => {
    const result = await controller.getMovies();
    expect(result).toEqual(getMovieMock);
  });

  it('should return data of views', async () => {
    const result = await controller.getViews();
    expect(result).toEqual(getViewsMock);
  });

  it('should return all categoryes', async () => {
    const result = await controller.getCategories();
    expect(result).toEqual(getCategoriesMock);
  });

  it('should cerate a catefory', async () => {
    const dto: CreateCategoryDto = {
      name: 'Ação',
    };
    const result = await controller.createCategory(dto);
    expect(result).toEqual(createCategory);
  });

  it('should create a movie', async () => {
    const dto: GetMovieYoutubeDto = {
      url: 'dadadasda',
      category_id: '1',
    };
    const result = await controller.createMovie(dto);
    expect(result).toEqual(createMovieDto);
  });
});
