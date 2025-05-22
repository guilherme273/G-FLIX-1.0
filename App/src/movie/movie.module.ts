import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { AuthModule } from '../auth/auth.module';
import { CategoryEntity } from '../category/entities/category.entity';
import { ReactionsEntity } from '../reactions/entities/reaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity, CategoryEntity, ReactionsEntity]),
    AuthModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
