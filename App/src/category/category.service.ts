import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll() {
    try {
      const categories = await this.categoryRepository.find();
      return {
        categories,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
