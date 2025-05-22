import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { MovieEntity } from '../movie/entities/movie.entity';
import { FavoritesEntity } from '../favorites/entities/favorite.entity';
import { ReactionsEntity } from '../reactions/entities/reaction.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { HttpModule } from '@nestjs/axios';
import { ViewEntity } from '../view/entities/view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      MovieEntity,
      FavoritesEntity,
      ReactionsEntity,
      CategoryEntity,
      ViewEntity,
    ]),
    AuthModule,
    HttpModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
