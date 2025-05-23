import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
