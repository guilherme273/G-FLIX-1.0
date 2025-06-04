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
import { categoryFindMock } from '../__mocks__/categoryFindMock';
import { viewEntityMock } from '../../view/__moks/viewEntityMock';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  mockCategories,
  movieMock,
} from '../../movie/__mocks__/movieMockFindAll';
import { deleteResultMock } from '../../reactions/__mocks__/reactionsDelete';
import {
  changePermisionDtoMock,
  UserEntytyWithEmailSuperAdmin,
} from '../__mocks__/changePermision';
import { userEntityMock } from '../../user/__mocks__/UserEntityMock';
import { updateMovieDtoMock } from '../__mocks__/updateMovie';
import { categorymock } from '../../category/__mocks__/categoryFindall';
import {
  mockCategoriesdelete,
  movieMockDeleteCategory,
} from '../__mocks__/deleteCategory';
import {
  CreateMovieDto,
  GetMovieYoutubeDto,
} from '../../movie/dto/create-movie.dto';
import { fetchYoutubeMock } from '../__mocks__/createMovieMock';
import { of } from 'rxjs';

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
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            findAndCount: jest.fn(),
            count: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
            count: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(FavoritesEntity),
          useValue: {
            count: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ReactionsEntity),

          useValue: {
            count: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ViewEntity),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
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

  it('should return NotFoundException when not find the movie', async () => {
    jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(null);

    await expect(service.deleteMovie(1)).rejects.toThrow(
      new NotFoundException({
        msg: {
          type: 'error',
          content: `Filme não encontrado!`,
        },
      }),
    );
  });

  it('should delete a movie', async () => {
    jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(movieMock);
    jest
      .spyOn(movieRepository, 'delete')
      .mockResolvedValueOnce(deleteResultMock);

    const result = await service.deleteMovie(1);
    expect(result.msg).toEqual({
      type: 'success',
      content: `Filme ${movieMock.title} deletado com sucesso!`,
    });
  });

  it('should return NotFoundException when not find the user', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
    await expect(
      service.changePermission(changePermisionDtoMock),
    ).rejects.toThrow(
      new NotFoundException({
        msg: {
          type: 'error',
          content: `Usuário não encontrado!`,
        },
      }),
    );
  });

  it('should return ConflictException when try excluses super admin', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(UserEntytyWithEmailSuperAdmin);
    await expect(
      service.changePermission(changePermisionDtoMock),
    ).rejects.toThrow(
      new ConflictException({
        msg: {
          type: 'error',
          content: `Não é permitido alterar as permissões deste usuário!`,
        },
      }),
    );
  });

  it('should change permision of user', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(userEntityMock({ type: 0 }));

    jest
      .spyOn(userRepository, 'save')
      .mockResolvedValueOnce(userEntityMock({ type: 1 }));
    const result = await service.changePermission(changePermisionDtoMock);

    expect(result.msg).toEqual({
      type: 'success',
      content: 'Permissão alterada com sucesso!',
    });
  });

  it('should return NotFoundException when not find the movie', async () => {
    jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(null);

    await expect(service.updateMovie(updateMovieDtoMock)).rejects.toThrow(
      new NotFoundException({
        msg: {
          type: 'error',
          content: `Filme não encontrado!`,
        },
      }),
    );
  });

  it('should return notFoundException when not found the category', async () => {
    jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(movieMock);
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValueOnce(null);
    await expect(service.updateMovie(updateMovieDtoMock)).rejects.toThrow(
      new NotFoundException({
        msg: {
          type: 'error',
          content: `Categoria desconhecida!`,
        },
      }),
    );
  });

  it('should return a moview updated', async () => {
    jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(movieMock);
    jest
      .spyOn(categoryRepository, 'findOne')
      .mockResolvedValueOnce(categorymock);
    jest.spyOn(movieRepository, 'save').mockResolvedValueOnce(movieMock);

    const result = await service.updateMovie(updateMovieDtoMock);

    expect(result.msg).toEqual({
      type: 'success',
      content: 'Filme atualizado com sucesso!',
    });

    expect(result.data).toEqual(movieMock);
  });

  it('should return movies with some calculations', async () => {
    // Refatorar depois com mocks personalizados para dar o expect nos resultados corretamente
    jest.spyOn(movieRepository, 'find').mockResolvedValueOnce([movieMock]);
    jest
      .spyOn(categoryRepository, 'find')
      .mockResolvedValueOnce(mockCategories);

    const result = await service.getMovies();

    expect(result);
  });

  it('should return notFoundException when not found the user', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

    await expect(service.deleteUser(1, 1)).rejects.toThrow(
      new NotFoundException({
        msg: {
          type: 'error',
          content: `Usuário não encontrado!`,
        },
      }),
    );
  });

  it('should return ConflictException when if is superadmin', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(UserEntytyWithEmailSuperAdmin);

    await expect(service.deleteUser(1, 1)).rejects.toThrow(
      new ConflictException({
        msg: {
          type: 'error',
          content: `Usuário ${UserEntytyWithEmailSuperAdmin.name} não pode ser deletado!`,
        },
      }),
    );
  });

  it('should return ConflictException when if is current user ', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(userEntityMock({ id: 1 }));

    await expect(service.deleteUser(1, 1)).rejects.toThrow(
      new ConflictException({
        msg: {
          type: 'error',
          content: `A própria conta só pode ser deletada através do menu do usuário fora da área adminstrativa!`,
        },
      }),
    );
  });

  it('should delete the user', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(userEntityMock({ id: 1 }));
    jest
      .spyOn(userRepository, 'delete')
      .mockResolvedValueOnce(deleteResultMock);
    const result = await service.deleteUser(1, 5);
    expect(result.msg).toEqual({
      type: 'success',
      content: 'Usuário Deletado com sucesso!',
    });
  });

  it('should return ConflictException when exist the category', async () => {
    jest
      .spyOn(categoryRepository, 'findOne')
      .mockResolvedValueOnce(categorymock);
    const categoryCReateDTO = {
      name: 'ação',
    };
    await expect(service.createCategory(categoryCReateDTO)).rejects.toThrow(
      new ConflictException({
        msg: {
          type: 'error',
          content: `Categoria: ${categoryCReateDTO.name} já cadastrada!`,
        },
      }),
    );
  });

  it('should return a cargetogy creatded', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(categoryRepository, 'save').mockResolvedValueOnce(categorymock);
    const categoryCReateDTO = {
      name: 'Ação',
    };
    const result = await service.createCategory(categoryCReateDTO);
    expect(result.msg).toEqual({
      type: 'success',
      content: `Categoria: ${categorymock.name} cadastrada com sucesso!`,
    });
    expect(result.categoryCreated).toEqual(categorymock);
  });

  it('should return notFoundexception when not find the category', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValueOnce(null);

    await expect(service.deleteCategory(1)).rejects.toThrow(
      new NotFoundException({
        msg: { type: 'error', content: 'Categoria não encontrada' },
      }),
    );
  });

  it('should return conflit exception when category has relation with some movie', async () => {
    jest
      .spyOn(categoryRepository, 'findOne')
      .mockResolvedValueOnce(mockCategoriesdelete);
    jest
      .spyOn(movieRepository, 'findOne')
      .mockResolvedValueOnce(movieMockDeleteCategory());
    await expect(service.deleteCategory(1)).rejects.toThrow(
      new ConflictException({
        msg: {
          type: 'error',
          content: `Antes de excluir esta categoria, atribua uma nova categoria aos filmes que estão relacionados a ela!`,
        },
      }),
    );
  });

  it('sould delete a category', async () => {
    jest
      .spyOn(categoryRepository, 'findOne')
      .mockResolvedValueOnce(mockCategoriesdelete);
    jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(null);
    jest
      .spyOn(categoryRepository, 'delete')
      .mockResolvedValueOnce(deleteResultMock);
    const result = await service.deleteCategory(1);
    expect(result.msg).toEqual({
      type: 'success',
      content: `Categoria ${mockCategoriesdelete.name} excluída com sucesso!`,
    });
  });

  it('sould return the users with some calcations', async () => {
    jest
      .spyOn(userRepository, 'findAndCount')
      .mockResolvedValue([[userEntityMock({ type: 1 })], 1]);
    jest.spyOn(userRepository, 'count').mockResolvedValue(1);
    jest
      .spyOn(userRepository, 'find')
      .mockResolvedValue([userEntityMock({ type: 1 })]);
    const result = await service.getUsers();

    expect(result.count).toEqual(1);
    expect(result.countAdmin).toEqual(1);
    expect(result.userGrowthData.length).toEqual(12);
    expect(result.users.length).toEqual(1);
  });

  it('should return data of overview page', async () => {
    jest.spyOn(userRepository, 'count').mockResolvedValue(1);
    jest.spyOn(movieRepository, 'count').mockResolvedValue(1);
    jest.spyOn(favoritesRepository, 'count').mockResolvedValue(1);
    jest.spyOn(reactionsRepository, 'count').mockResolvedValue(1);
    jest.spyOn(categoryRepository, 'find').mockResolvedValue(mockCategories);

    const result = await service.overview();
    expect(result.userscount).toEqual(1);
    expect(result.moviesCount).toEqual(1);
    expect(result.favoritesCount).toEqual(1);
    expect(result.reactionsCount).toEqual(1);
    expect(result.moviesPerCategory.length).toEqual(1);
    expect(result.moviesPerCategory[0].value).toEqual(1);
  });

  it('should return a BadRequest when invalid url', async () => {
    const dto: GetMovieYoutubeDto = {
      url: 'iasdiandsiandaiundauidnaidmasndnsmdmaskjnasdakmdsajsdkasdjasdasdasdiskdmljnasdasmdksad',
      category_id: '1',
    };
    await expect(service.fetchYouTubeData(dto)).rejects.toThrow(
      new BadRequestException({
        msg: { type: 'error', content: 'URL inválida!' },
      }),
    );
  });

  it('sould return a dto of youtube for creation of movie', async () => {
    const dto: GetMovieYoutubeDto = {
      url: 'https://www.youtube.com/watch?v=T-2OnaS-yZw&t=4919s',
      category_id: '1',
    };
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(fetchYoutubeMock));
    const result = await service.fetchYouTubeData(dto);
    expect(result.url).toEqual(
      'https://www.youtube.com/watch?v=T-2OnaS-yZw&t=4919s',
    );
  });

  it('should return a ConflictException when the movie exists', async () => {
    const dto_youtube: CreateMovieDto = {
      title: movieMock.title,
      url: 'https://www.youtube.com/watch?v=T-2OnaS-yZw',
      cover: 'https://image.jpg',
      category_id: 1,
      youtube_id: 'abc123',
    };
    const dto_front: GetMovieYoutubeDto = {
      url: 'https://www.youtube.com/watch?v=T-2OnaS-yZw',
      category_id: '1',
    };
    jest.spyOn(service, 'fetchYouTubeData').mockResolvedValueOnce(dto_youtube);
    jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(movieMock);
    await expect(service.createMovie(dto_front)).rejects.toThrow(
      new ConflictException({
        msg: {
          type: 'error',
          content: `Filme: ${dto_youtube.title} já cadastrado!`,
        },
      }),
    );
  });

  it('should retun a NotfoundException when the category is not exist', async () => {
    const dto_youtube: CreateMovieDto = {
      title: movieMock.title,
      url: 'https://www.youtube.com/watch?v=T-2OnaS-yZw',
      cover: 'https://image.jpg',
      category_id: 1,
      youtube_id: 'abc123',
    };
    const dto_front: GetMovieYoutubeDto = {
      url: 'https://www.youtube.com/watch?v=T-2OnaS-yZw',
      category_id: '1',
    };
    jest.spyOn(service, 'fetchYouTubeData').mockResolvedValueOnce(dto_youtube);
    jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValueOnce(null);

    await expect(service.createMovie(dto_front)).rejects.toThrow(
      new NotFoundException({
        msg: {
          type: 'error',
          content: `Categoria não encontrada!`,
        },
      }),
    );
  });

  it('should create a movie', async () => {
    const dto: GetMovieYoutubeDto = {
      url: 'https://www.youtube.com/watch?v=T-2OnaS-yZw&t=4919s',
      category_id: '1',
    };
    const dto_youtube: CreateMovieDto = {
      title: movieMock.title,
      url: 'https://www.youtube.com/watch?v=T-2OnaS-yZw',
      cover: 'https://image.jpg',
      category_id: 1,
      youtube_id: 'abc123',
    };
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(fetchYoutubeMock));
    jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(null);
    jest
      .spyOn(categoryRepository, 'findOne')
      .mockResolvedValueOnce(categorymock);
    jest.spyOn(movieRepository, 'save').mockResolvedValueOnce(movieMock);

    const result = await service.createMovie(dto);
    expect(result.msg).toEqual({
      type: 'success',
      content: `Filme: ${movieMock.title} cadastrado com sucesso!`,
    });
  });
});
