import { Controller, Get, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.movieService.findAll();
  }
}
