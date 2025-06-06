import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';

import { ChangePermissionDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository, DataSource, Between } from 'typeorm';
import { MovieEntity } from '../movie/entities/movie.entity';
import { FavoritesEntity } from '../favorites/entities/favorite.entity';
import { ReactionsEntity } from '../reactions/entities/reaction.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { subMonths, startOfMonth, format } from 'date-fns';
import { UpdateMovieDto } from '../movie/dto/update-movie.dto';
import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { hash } from 'bcrypt';

import {
  CreateMovieDto,
  GetMovieYoutubeDto,
  YouTubeApiResponse,
} from '../movie/dto/create-movie.dto';
import { ViewEntity } from '../view/entities/view.entity';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,

    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,

    @InjectRepository(ReactionsEntity)
    private readonly reactionsRepository: Repository<ReactionsEntity>,

    @InjectRepository(ViewEntity)
    private readonly viewsRepository: Repository<ViewEntity>,

    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    private dataSource: DataSource,
    private readonly httpService: HttpService,
  ) {}
  async onModuleInit(): Promise<void> {
    await this.createAdminIfNotExists();
  }

  async createAdminIfNotExists() {
    const adminName = process.env.ADMIN_NAME?.toString();
    const adminEmail = process.env.ADMIN_EMAIL?.toString();
    const adminPassword = process.env.ADMIN_PASSOWRD?.toString();
    const type = process.env.ADMIN_TYPE?.toString();

    if (!adminName || !adminEmail || !adminPassword || !type) {
      throw new Error('❌ Variáveis de ambiente do admin estão faltando!');
    }

    const user = await this.userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!user) {
      const password_hashed = await hash(adminPassword, 15);
      await this.userRepository.save({
        name: adminName,
        email: adminEmail,
        password: password_hashed,
        type: Number(type),
      });
      return true;
    }
  }

  async fetchYouTubeData(
    movieYoutubeDto: GetMovieYoutubeDto,
  ): Promise<CreateMovieDto> {
    const urlMovie = movieYoutubeDto.url;
    const shortenedUrl = urlMovie.slice(0, 43);
    const youtubeId = this.extractYouTubeID(shortenedUrl);
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!youtubeId) {
      throw new BadRequestException({
        msg: { type: 'error', content: 'URL inválida!' },
      });
    }

    const url = `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=snippet,contentDetails,statistics&key=${apiKey}`;

    try {
      const response$ = this.httpService.get<YouTubeApiResponse>(url);
      const response = await lastValueFrom(response$);
      const result = response.data;

      const imageUrl = result.items[0]?.snippet?.thumbnails?.medium?.url;
      const title = result.items[0]?.snippet?.title;

      const createMovieDto: CreateMovieDto = {
        title: title,
        url: urlMovie,
        cover: imageUrl,
        category_id: Number(movieYoutubeDto.category_id),
        youtube_id: youtubeId,
      };
      return createMovieDto;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        msg: {
          type: 'error',
          content: 'Erro ao buscar dados do YouTube!',
        },
      });
    }
  }

  async createMovie(movieYoutubeDto: GetMovieYoutubeDto) {
    const createMovieDto = await this.fetchYouTubeData(movieYoutubeDto);
    const movie = await this.movieRepository.findOne({
      where: { url: createMovieDto.url },
    });

    if (movie) {
      throw new ConflictException({
        msg: {
          type: 'error',
          content: `Filme: ${movie.title} já cadastrado!`,
        },
      });
    }

    const category = await this.categoryRepository.findOne({
      where: { id: createMovieDto.category_id },
    });

    if (!category) {
      throw new NotFoundException({
        msg: {
          type: 'error',
          content: `Categoria não encontrada!`,
        },
      });
    }

    try {
      const movieCreated = await this.movieRepository.save({
        title: createMovieDto.title,
        url: createMovieDto.url,
        cover: createMovieDto.cover,
        category: category,
        youtube_id: createMovieDto.youtube_id,
      });

      return {
        movieCreated,
        msg: {
          type: 'success',
          content: `Filme: ${movieCreated.title} cadastrado com sucesso!`,
        },
      };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException({
        msg: {
          type: 'error',
          content: 'Erro ao salvar o filme, contate o suporte!',
        },
      });
    }
  }

  async overview() {
    try {
      const userscount = await this.userRepository.count();
      const moviesCount = await this.movieRepository.count();
      const favoritesCount = await this.favoritesRepository.count();
      const reactionsCount = await this.reactionsRepository.count();

      const findmoviesForCategory = await this.categoryRepository.find({
        relations: ['movies', 'movies.views'],
        order: { name: 'ASC' },
      });

      const moviesPerCategory = findmoviesForCategory.map((category) => ({
        name: category.name,
        value: category.movies.length,
      }));
      const viewsPerCategory = findmoviesForCategory.map((category) => {
        const totalViews = category.movies.reduce((sum, movie) => {
          return sum + (movie.views?.length || 0);
        }, 0);

        return {
          name: category.name,
          value: totalViews,
        };
      });

      return {
        userscount,
        moviesCount,
        favoritesCount,
        reactionsCount,
        moviesPerCategory,
        viewsPerCategory,
      };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException({
        msg: {
          type: 'error',
          content: 'Erro ao buscar dados, contate o suporte!',
        },
      });
    }
  }

  async getUsers() {
    try {
      const [users, count] = await this.userRepository.findAndCount({
        select: ['id', 'name', 'email', 'type'],
      });
      const countAdmin = await this.userRepository.count({
        where: { type: 1 },
      });

      const now = new Date();
      const twelveMonthsAgo = startOfMonth(subMonths(now, 11));

      const usersEvolution = await this.userRepository.find({
        where: {
          createdAt: Between(twelveMonthsAgo, now),
        },
      });

      const userGrowthData: { name: string; value: number }[] = [];
      for (let i = 11; i >= 0; i--) {
        const date = subMonths(now, i);
        const name = format(date, 'MMM');
        userGrowthData.push({ name, value: 0 });
      }

      usersEvolution.forEach((user) => {
        const name = format(user.createdAt, 'MMM');
        const entry = userGrowthData.find((item) => item.name === name);
        if (entry) {
          entry.value += 1;
        }
      });

      return {
        users,
        count,
        userGrowthData,
        countAdmin,
      };
    } catch (e: unknown) {
      console.error(e);

      throw new InternalServerErrorException({
        msg: {
          type: 'error',
          content: 'Erro ao buscar dados, contate o suporte!',
        },
      });
    }
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException({
        msg: { type: 'error', content: 'Categoria não encontrada' },
      });
    }

    const hasRelation = await this.movieRepository.findOne({
      where: { category: category },
    });
    if (hasRelation) {
      throw new ConflictException({
        msg: {
          type: 'error',
          content: `Antes de excluir esta categoria, atribua uma nova categoria aos filmes que estão relacionados a ela!`,
        },
      });
    }

    try {
      await this.categoryRepository.delete(category.id);
      return {
        msg: {
          type: 'success',
          content: `Categoria ${category.name} excluída com sucesso!`,
        },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        msg: {
          type: 'error',
          content: 'Erro ao deletar categoria, contate o suporte!',
        },
      });
    }
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (category) {
      throw new ConflictException({
        msg: {
          type: 'error',
          content: `Categoria: ${category.name} já cadastrada!`,
        },
      });
    }

    try {
      const categoryCreated =
        await this.categoryRepository.save(createCategoryDto);

      return {
        categoryCreated,
        msg: {
          type: 'success',
          content: `Categoria: ${categoryCreated.name} cadastrada com sucesso!`,
        },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        msg: {
          type: 'error',
          content: 'erro no servidor ao salvar categoria, contate o suporte!',
        },
      });
    }
  }

  async deleteUser(id_user_del: number, id_user_current: number) {
    const emailMain = process.env.ADMIN_EMAIL;

    const user_del = await this.userRepository.findOne({
      where: { id: id_user_del },
    });

    if (!user_del) {
      throw new NotFoundException({
        msg: {
          type: 'error',
          content: `Usuário não encontrado!`,
        },
      });
    }

    if (user_del.email === emailMain) {
      throw new ConflictException({
        msg: {
          type: 'error',
          content: `Usuário ${emailMain} não pode ser deletado!`,
        },
      });
    }

    if (user_del.id === id_user_current) {
      throw new ConflictException({
        msg: {
          type: 'error',
          content: `A própria conta só pode ser deletada através do menu do usuário fora da área adminstrativa!`,
        },
      });
    }
    try {
      await this.userRepository.delete(user_del.id);
      return {
        msg: {
          type: 'success',
          content: 'Usuário Deletado com sucesso!',
        },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        msg: {
          type: 'error',
          content: 'Erro ao deletar usuário, contate o suporte!',
        },
      });
    }
  }

  async getMovies() {
    const movies = await this.movieRepository.find({
      relations: [
        'reactions',
        'reactions.reactionType',
        'favorites',
        'views',
        'category',
      ],
      order: {
        title: 'ASC',
      },
    });

    const top10MostViewed = movies
      .map((movie) => {
        const viewsCount = movie.views?.length || 0;
        return {
          ...movie,
          viewsCount,
        };
      })
      .sort((a, b) => b.viewsCount - a.viewsCount)
      .slice(0, 10);

    const top10MostWatched = movies
      .map((movie) => {
        const totalSecondsWatched =
          movie.views?.reduce((sum, view) => {
            return sum + (view.seconds_watched || 0);
          }, 0) || 0;

        return {
          ...movie,
          totalSecondsWatched,
        };
      })
      .sort((a, b) => b.totalSecondsWatched - a.totalSecondsWatched)
      .slice(0, 10);

    const findmoviesForCategory = await this.categoryRepository.find({
      relations: ['movies', 'movies.views'],
      order: { name: 'ASC' },
    });

    const moviesPerCategory = findmoviesForCategory.map((category) => ({
      name: category.name,
      value: category.movies.length,
    }));

    return {
      movies,
      moviesPerCategory,
      top10MostViewed,
      top10MostWatched,
    };
  }

  async updateMovie(updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.findOne({
      where: { id: updateMovieDto.id_movie },
    });

    if (!movie) {
      throw new NotFoundException({
        msg: {
          type: 'error',
          content: `Filme não encontrado!`,
        },
      });
    }

    const category = await this.categoryRepository.findOne({
      where: { id: +updateMovieDto.category_id },
    });
    if (!category) {
      throw new NotFoundException({
        msg: {
          type: 'error',
          content: `Categoria desconhecida!`,
        },
      });
    }

    try {
      movie.title = updateMovieDto.title;
      movie.category = category;

      const movieUpdated = await this.movieRepository.save(movie);

      return {
        msg: {
          type: 'success',
          content: 'Filme atualizado com sucesso!',
        },
        data: movieUpdated,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        msg: {
          type: 'error',
          content: 'Erro ao atualizar filme, contate o suporte!',
        },
      });
    }
  }

  async changePermission(changePermission: ChangePermissionDto) {
    const emailMain = process.env.ADMIN_EMAIL;
    const user = await this.userRepository.findOne({
      where: { id: changePermission.id_user },
    });

    if (!user) {
      throw new NotFoundException({
        msg: {
          type: 'error',
          content: `Usuário não encontrado!`,
        },
      });
    }

    if (user.email === emailMain) {
      throw new ConflictException({
        msg: {
          type: 'error',
          content: `Não é permitido alterar as permissões deste usuário!`,
        },
      });
    }

    try {
      await this.userRepository.save({
        ...user,
        type: Number(changePermission.type),
      });

      return {
        msg: {
          type: 'success',
          content: 'Permissão alterada com sucesso!',
        },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        msg: {
          type: 'error',
          content: 'Erro ao trocar permissão do usuário, contate o suporte!',
        },
      });
    }
  }

  async deleteMovie(id: number) {
    const movieToDel = await this.movieRepository.findOne({ where: { id } });

    if (!movieToDel) {
      throw new NotFoundException({
        msg: {
          type: 'error',
          content: `Filme não encontrado!`,
        },
      });
    }

    try {
      await this.movieRepository.delete(id);
      return {
        msg: {
          type: 'success',
          content: `Filme ${movieToDel.title} deletado com sucesso!`,
        },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        msg: {
          type: 'error',
          content: 'Erro ao deletar o filme, contate o suporte!',
        },
      });
    }
  }

  async getViews() {
    const findmoviesForCategory = await this.categoryRepository.find({
      relations: ['movies', 'movies.views'],
      order: { name: 'ASC' },
    });

    const viewsPerCategory = findmoviesForCategory.map((category) => {
      const totalViews = category.movies.reduce((sum, movie) => {
        return sum + (movie.views?.length || 0);
      }, 0);

      return {
        name: category.name,
        value: totalViews,
      };
    });

    const secondsWatchedPerCategory = findmoviesForCategory.map((category) => {
      const totalSeconds = category.movies.reduce((movieSum, movie) => {
        const movieSeconds =
          movie.views?.reduce((viewSum, view) => {
            return viewSum + (view.seconds_watched || 0);
          }, 0) || 0;

        return movieSum + movieSeconds;
      }, 0);

      return {
        name: category.name,
        value: totalSeconds,
      };
    });

    const views = await this.viewsRepository.find({
      order: {
        createdAt: 'ASC',
      },
    });

    const today = new Date();

    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 10);

    const filteredViews = views.filter((view) => {
      const viewDate = new Date(view.createdAt);
      return viewDate >= thirtyDaysAgo && viewDate <= today;
    });

    const dailyMinutes = filteredViews.reduce((acc, view) => {
      const viewDate = new Date(view.createdAt);
      const day = viewDate.toLocaleDateString('pt-BR');
      const minutes = view.seconds_watched / 60;
      if (!acc[day]) {
        acc[day] = 0;
      }
      acc[day] += minutes;
      return acc;
    }, {});

    const resultsArray = Object.entries(dailyMinutes).map(
      ([day, minutesWatched]) => ({
        name: day,
        value: minutesWatched,
      }),
    );

    return {
      viewsPerCategory,
      secondsWatchedPerCategory,
      minutesForDay: resultsArray,
    };
  }

  async getCategories() {
    try {
      const categories = await this.categoryRepository.find({
        relations: ['movies', 'movies.views'],
        order: {
          name: 'ASC',
        },
      });
      return {
        categories,
      };
    } catch (error) {
      console.log(error);
    }
  }
  extractYouTubeID = (url: string) => {
    const regex =
      /(?:\?v=|&v=|youtu\.be\/|embed\/|\/v\/|\/e\/|watch\?v=|watch\?.+&v=)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
}
